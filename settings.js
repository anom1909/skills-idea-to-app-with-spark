// Settings page functionality

document.addEventListener('DOMContentLoaded', async () => {
  const apiKeyInput = document.getElementById('api-key');
  const modelSelect = document.getElementById('model');
  const saveBtn = document.getElementById('save-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const alertDiv = document.getElementById('alert');

  // Load saved settings
  const loadSettings = async () => {
    const { apiKey, model } = await chrome.storage.local.get(['apiKey', 'model']);
    
    if (apiKey) {
      apiKeyInput.value = apiKey;
    }
    
    if (model) {
      modelSelect.value = model;
    }
  };

  await loadSettings();

  // Save settings
  saveBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    const model = modelSelect.value;

    if (!apiKey) {
      showAlert('Please enter an API key', 'error');
      return;
    }

    // Basic validation of API key format
    if (!apiKey.startsWith('sk-')) {
      showAlert('Invalid API key format. OpenAI API keys start with "sk-"', 'error');
      return;
    }

    try {
      // Save to storage
      await chrome.storage.local.set({
        apiKey,
        model
      });

      showAlert('Settings saved successfully! ✓', 'success');

      // Close the page after a delay
      setTimeout(() => {
        window.close();
      }, 1500);
    } catch (error) {
      showAlert(`Failed to save settings: ${error.message}`, 'error');
    }
  });

  // Cancel button
  cancelBtn.addEventListener('click', () => {
    window.close();
  });

  // Helper function to show alerts
  function showAlert(message, type) {
    alertDiv.textContent = message;
    alertDiv.className = `alert ${type}`;
    alertDiv.style.display = 'block';

    if (type === 'success') {
      setTimeout(() => {
        alertDiv.style.display = 'none';
      }, 3000);
    }
  }
});
