// Background service worker for Terms & Privacy Policy Analyzer

// Configuration
const MAX_ANALYSIS_LENGTH = 15000; // Maximum characters to send to LLM

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeText') {
    analyzeTextWithLLM(request.text, request.url)
      .then(results => {
        sendResponse({ results });
      })
      .catch(error => {
        sendResponse({ error: error.message });
      });
    return true; // Keep the message channel open for async response
  }
});

/**
 * Analyze text using OpenAI API
 * @param {string} text - The text to analyze
 * @param {string} url - The URL of the page being analyzed
 * @returns {Promise<Array>} - Array of findings
 */
async function analyzeTextWithLLM(text, url) {
  try {
    // Get API key from storage
    const { apiKey, model } = await chrome.storage.local.get(['apiKey', 'model']);
    
    if (!apiKey) {
      throw new Error('API key not configured. Please configure it in settings.');
    }

    const selectedModel = model || 'gpt-3.5-turbo';

    // Prepare the prompt for the LLM
    const systemPrompt = `You are an expert legal analyst specializing in Terms of Service and Privacy Policies. Your task is to identify potentially dangerous, concerning, or unusual terms that users should be aware of.

Analyze the provided text and identify issues such as:
- Data sharing with third parties
- Selling user data
- Lack of data deletion rights
- Automatic renewals and hard-to-cancel subscriptions
- Broad liability waivers
- Forced arbitration clauses
- Tracking and surveillance
- Indefinite data retention
- Rights to modify terms without notice
- Ownership claims over user content
- Excessive permissions
- Vague or overly broad language
- Unfair or one-sided terms

For each issue found, provide:
1. A clear title (10 words or less)
2. A brief description explaining why it's concerning
3. A short relevant quote from the text (if possible, 20 words or less)
4. A severity rating: "high", "medium", or "low"

Return your response as a JSON array of objects with this structure:
[
  {
    "title": "Issue title",
    "description": "Why this is concerning",
    "quote": "Relevant quote from text",
    "severity": "high|medium|low"
  }
]

If no concerning terms are found, return an empty array: []`;

    const userPrompt = `Please analyze the following Terms of Service or Privacy Policy text and identify any dangerous or concerning terms:\n\n${text.substring(0, MAX_ANALYSIS_LENGTH)}`;

    // Prepare request body
    const requestBody = {
      model: selectedModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 2000
    };

    // Add JSON mode for supported models (gpt-3.5-turbo-1106+, gpt-4-turbo-preview+)
    // Fallback to regular mode for older models
    if (selectedModel.includes('turbo') || selectedModel.includes('gpt-4')) {
      requestBody.response_format = { type: "json_object" };
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the JSON response
    let results;
    try {
      const parsed = JSON.parse(content);
      // Handle both array and object responses
      results = Array.isArray(parsed) ? parsed : (parsed.findings || parsed.issues || []);
    } catch (parseError) {
      console.error('Failed to parse LLM response:', content);
      throw new Error('Failed to parse analysis results. Please try again.');
    }

    // Validate and clean results
    results = results.filter(item => 
      item.title && 
      item.description && 
      item.severity &&
      ['high', 'medium', 'low'].includes(item.severity.toLowerCase())
    ).map(item => ({
      title: item.title.trim(),
      description: item.description.trim(),
      quote: item.quote ? item.quote.trim() : '',
      severity: item.severity.toLowerCase()
    }));

    // Store the results in storage for history
    const timestamp = new Date().toISOString();
    const { analysisHistory = [] } = await chrome.storage.local.get('analysisHistory');
    
    analysisHistory.unshift({
      url,
      timestamp,
      findingsCount: results.length,
      results: results.slice(0, 5) // Store only top 5 to save space
    });

    // Keep only last 10 analyses
    if (analysisHistory.length > 10) {
      analysisHistory.pop();
    }

    await chrome.storage.local.set({ analysisHistory });

    return results;

  } catch (error) {
    console.error('Analysis error:', error);
    throw error;
  }
}

/**
 * Alternative: Analyze using local heuristics (fallback if no API key)
 * This is a simple pattern-matching approach without LLM
 */
function analyzeWithHeuristics(text) {
  const findings = [];
  const lowerText = text.toLowerCase();

  // Define patterns for dangerous terms
  const patterns = [
    {
      keywords: ['sell your data', 'sell your information', 'sell personal information'],
      title: 'Data Selling',
      description: 'This document mentions selling user data to third parties.',
      severity: 'high'
    },
    {
      keywords: ['share with third parties', 'third party sharing'],
      title: 'Third-party Data Sharing',
      description: 'Your data may be shared with third-party companies.',
      severity: 'medium'
    },
    {
      keywords: ['track your', 'tracking cookies', 'behavioral tracking'],
      title: 'User Tracking',
      description: 'The service tracks your behavior and activities.',
      severity: 'medium'
    },
    {
      keywords: ['automatic renewal', 'automatically renew', 'auto-renew'],
      title: 'Automatic Renewal',
      description: 'Subscription automatically renews and charges you.',
      severity: 'medium'
    },
    {
      keywords: ['arbitration', 'class action waiver', 'waive your right'],
      title: 'Forced Arbitration',
      description: 'You may be waiving your right to sue or join class action lawsuits.',
      severity: 'high'
    },
    {
      keywords: ['retain indefinitely', 'permanent retention', 'retain forever'],
      title: 'Indefinite Data Retention',
      description: 'Your data may be retained indefinitely.',
      severity: 'high'
    },
    {
      keywords: ['modify terms', 'change these terms', 'update this agreement'],
      title: 'Terms Can Change',
      description: 'The company can modify terms at any time, potentially without notice.',
      severity: 'low'
    }
  ];

  patterns.forEach(pattern => {
    const found = pattern.keywords.some(keyword => lowerText.includes(keyword));
    if (found) {
      findings.push({
        title: pattern.title,
        description: pattern.description,
        quote: '',
        severity: pattern.severity
      });
    }
  });

  return findings;
}
