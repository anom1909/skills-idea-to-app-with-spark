// Content script for extracting text from web pages

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractText') {
    const extractedText = extractPageText();
    sendResponse({ text: extractedText });
  }
  return true; // Keep the message channel open for async response
});

/**
 * Extract text content from the current page
 * Prioritizes content that looks like Terms of Service or Privacy Policy
 */
function extractPageText() {
  // Remove script and style elements
  const clonedBody = document.body.cloneNode(true);
  const scripts = clonedBody.querySelectorAll('script, style, noscript');
  scripts.forEach(el => el.remove());

  // Try to find specific containers that might hold ToS or Privacy Policy
  const possibleContainers = [
    // Common class and id patterns
    ...clonedBody.querySelectorAll('[class*="terms"], [id*="terms"]'),
    ...clonedBody.querySelectorAll('[class*="privacy"], [id*="privacy"]'),
    ...clonedBody.querySelectorAll('[class*="policy"], [id*="policy"]'),
    ...clonedBody.querySelectorAll('[class*="legal"], [id*="legal"]'),
    ...clonedBody.querySelectorAll('[class*="tos"], [id*="tos"]'),
    // Common semantic elements
    ...clonedBody.querySelectorAll('article'),
    ...clonedBody.querySelectorAll('main'),
    ...clonedBody.querySelectorAll('[role="main"]')
  ];

  let extractedText = '';

  // If we found specific containers, use the first matching one
  if (possibleContainers.length > 0) {
    extractedText = possibleContainers[0].innerText || possibleContainers[0].textContent;
  } else {
    // Fall back to entire body text
    extractedText = clonedBody.innerText || clonedBody.textContent;
  }

  // Clean up the text
  extractedText = extractedText
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
    .trim();

  // Limit text length to avoid overwhelming the API (keep first 50000 chars)
  if (extractedText.length > 50000) {
    extractedText = extractedText.substring(0, 50000) + '...';
  }

  return extractedText;
}

/**
 * Highlight dangerous terms on the page
 * @param {Array} terms - Array of terms to highlight
 */
function highlightTerms(terms) {
  if (!terms || terms.length === 0) return;

  const style = document.createElement('style');
  style.textContent = `
    .dangerous-term-highlight {
      background-color: rgba(255, 0, 0, 0.3);
      border-bottom: 2px solid red;
      cursor: help;
    }
  `;
  document.head.appendChild(style);

  // Implement text highlighting logic here if needed
  // This is a placeholder for future enhancement
}
