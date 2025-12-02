// Popup functionality for Terms & Privacy Policy Analyzer

document.addEventListener('DOMContentLoaded', async () => {
  const analyzeBtn = document.getElementById('analyze-btn');
  const clearBtn = document.getElementById('clear-btn');
  const settingsBtn = document.getElementById('settings-btn');
  const openSettingsLink = document.getElementById('open-settings');
  const resultsSection = document.getElementById('results-section');
  const resultsContent = document.getElementById('results-content');
  const errorSection = document.getElementById('error-section');
  const errorMessage = document.getElementById('error-message');
  const apiKeyStatus = document.getElementById('api-key-status');
  const btnText = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');

  // Check API key status
  const checkAPIKey = async () => {
    const { apiKey } = await chrome.storage.local.get('apiKey');
    if (!apiKey) {
      apiKeyStatus.classList.remove('hidden');
      return false;
    }
    apiKeyStatus.classList.add('hidden');
    return true;
  };

  await checkAPIKey();

  // Analyze button click handler
  analyzeBtn.addEventListener('click', async () => {
    try {
      // Check API key first
      const hasAPIKey = await checkAPIKey();
      if (!hasAPIKey) {
        showError('Please configure your API key in settings before analyzing.');
        return;
      }

      // Show loading state
      analyzeBtn.disabled = true;
      btnText.classList.add('hidden');
      btnLoading.classList.remove('hidden');
      hideError();
      hideResults();

      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // Inject content script and extract text
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });

      // Send message to content script to extract text
      chrome.tabs.sendMessage(tab.id, { action: 'extractText' }, async (response) => {
        if (chrome.runtime.lastError) {
          showError('Failed to extract text from page. Please try again.');
          resetButton();
          return;
        }

        if (!response || !response.text) {
          showError('No text content found on this page.');
          resetButton();
          return;
        }

        // Send text to background script for analysis
        chrome.runtime.sendMessage({
          action: 'analyzeText',
          text: response.text,
          url: tab.url
        }, (analysisResponse) => {
          if (chrome.runtime.lastError) {
            showError('Failed to analyze text. Please check your API key and try again.');
            resetButton();
            return;
          }

          if (analysisResponse.error) {
            showError(analysisResponse.error);
            resetButton();
            return;
          }

          displayResults(analysisResponse.results);
          resetButton();
        });
      });
    } catch (error) {
      showError(`An error occurred: ${error.message}`);
      resetButton();
    }
  });

  // Clear button click handler
  clearBtn.addEventListener('click', () => {
    hideResults();
    hideError();
  });

  // Settings button click handler
  settingsBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  // Open settings link click handler
  if (openSettingsLink) {
    openSettingsLink.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.runtime.openOptionsPage();
    });
  }

  // Helper functions
  function resetButton() {
    analyzeBtn.disabled = false;
    btnText.classList.remove('hidden');
    btnLoading.classList.add('hidden');
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorSection.classList.remove('hidden');
  }

  function hideError() {
    errorSection.classList.add('hidden');
  }

  function hideResults() {
    resultsSection.classList.add('hidden');
  }

  function displayResults(results) {
    hideError();
    resultsContent.innerHTML = '';

    if (!results || results.length === 0) {
      resultsContent.innerHTML = '<div class="success-message">✅ No dangerous or concerning terms detected! This document appears safe.</div>';
      resultsSection.classList.remove('hidden');
      return;
    }

    // Create stats
    const highCount = results.filter(r => r.severity === 'high').length;
    const mediumCount = results.filter(r => r.severity === 'medium').length;
    const lowCount = results.filter(r => r.severity === 'low').length;

    const statsHTML = `
      <div class="stats">
        <div class="stat-item">
          <div class="stat-number" style="color: #dc3545;">${highCount}</div>
          <div class="stat-label">High Risk</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" style="color: #ffc107;">${mediumCount}</div>
          <div class="stat-label">Medium Risk</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" style="color: #28a745;">${lowCount}</div>
          <div class="stat-label">Low Risk</div>
        </div>
      </div>
    `;

    resultsContent.innerHTML = statsHTML;

    // Display each finding
    results.forEach(result => {
      const itemDiv = document.createElement('div');
      itemDiv.className = result.severity === 'high' ? 'danger-item' :
                         result.severity === 'medium' ? 'warning-item' : 'info-item';

      itemDiv.innerHTML = `
        <h4>${result.title}</h4>
        <p>${result.description}</p>
        ${result.quote ? `<p><em>"${result.quote}"</em></p>` : ''}
        <span class="severity ${result.severity}">${result.severity} risk</span>
      `;

      resultsContent.appendChild(itemDiv);
    });

    resultsSection.classList.remove('hidden');
  }
});
