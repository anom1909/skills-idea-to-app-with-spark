# Installation Guide - Terms & Privacy Policy Analyzer

This guide will walk you through installing and configuring the Chrome extension.

## Prerequisites

✅ **Chrome Browser**: Chrome, Edge, Brave, or any Chromium-based browser  
✅ **OpenAI Account**: Free account at [platform.openai.com](https://platform.openai.com)  
✅ **API Key**: You'll need to generate an API key (see below)

---

## Step 1: Get Your OpenAI API Key

### 1.1 Create an OpenAI Account

1. Go to [platform.openai.com](https://platform.openai.com)
2. Click "Sign up" and create an account
3. Verify your email address

### 1.2 Add Payment Method

1. Log in to your OpenAI account
2. Click your profile icon → "Billing"
3. Add a payment method (required for API access)
4. Note: The API has pay-as-you-go pricing. First-time users often get free credits.

### 1.3 Generate API Key

1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Give it a name (e.g., "Privacy Analyzer")
4. Copy the key (starts with `sk-`)
5. ⚠️ **IMPORTANT**: Save this key securely - you can't view it again!

---

## Step 2: Install the Extension

### Option A: From Source (Recommended for Testing)

1. **Download the Repository**
   ```bash
   git clone https://github.com/anom1909/skills-idea-to-app-with-spark.git
   cd skills-idea-to-app-with-spark
   ```

   Or download as ZIP:
   - Click "Code" → "Download ZIP" on GitHub
   - Extract the ZIP file

2. **Open Chrome Extensions**
   - Open Chrome
   - Navigate to `chrome://extensions/`
   - Or: Menu (⋮) → Extensions → Manage Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the folder containing `manifest.json`
   - The extension should now appear in your list

5. **Pin the Extension** (Optional but Recommended)
   - Click the puzzle piece icon (🧩) in the toolbar
   - Find "Terms & Privacy Policy Analyzer"
   - Click the pin icon (📌) to keep it visible

### Option B: From Chrome Web Store (Coming Soon)

_The extension will be published to the Chrome Web Store in the future._

---

## Step 3: Configure the Extension

### 3.1 Open Settings

1. Click the extension icon in your toolbar
2. Click "⚙️ Settings" button
   - Or right-click the extension icon → Options

### 3.2 Enter Your API Key

1. In the "API Key" field, paste your OpenAI API key
2. Select your preferred model:
   - **GPT-3.5 Turbo**: ⚡ Fast and affordable (~$0.001 per analysis)
   - **GPT-4**: 🎯 Most accurate but expensive (~$0.03 per analysis)
   - **GPT-4 Turbo**: ⚖️ Balanced option

3. Click "💾 Save Settings"

### 3.3 Verify Setup

- You should see a "Settings saved successfully! ✓" message
- The settings page will close automatically
- Click the extension icon - the API key warning should be gone

---

## Step 4: Test the Extension

### Quick Test with Sample Page

1. **Open the Test Page**
   - In the extension folder, open `test-privacy-policy.html`
   - Or drag it into Chrome to open

2. **Analyze the Page**
   - Click the extension icon
   - Click "🔍 Analyze Page"
   - Wait 5-10 seconds for analysis

3. **Review Results**
   - You should see multiple findings categorized by severity
   - Red = High risk, Yellow = Medium risk, Green = Low risk

### Test with Real Websites

Try analyzing real privacy policies:

- [Twitter Privacy Policy](https://twitter.com/en/privacy)
- [Facebook Terms of Service](https://www.facebook.com/terms)
- [Google Privacy Policy](https://policies.google.com/privacy)
- [Amazon Privacy Notice](https://www.amazon.com/gp/help/customer/display.html?nodeId=468496)

---

## Troubleshooting

### "Please configure your API key"

**Solution**: Your API key isn't set or is incorrect
1. Click "Configure now" or Settings
2. Enter a valid OpenAI API key (starts with `sk-`)
3. Save and try again

### "Failed to analyze text"

**Possible causes**:
- ❌ Invalid API key
- ❌ No credits remaining on OpenAI account
- ❌ API rate limit exceeded
- ❌ Network connection issue

**Solutions**:
1. Verify your API key is correct
2. Check your OpenAI account has credits
3. Wait a minute and try again
4. Check browser console for error details (F12)

### "No text content found"

**Cause**: Page has no readable text or is blocked

**Solutions**:
- Try a different page
- Make sure the page has loaded completely
- Some pages (like Chrome settings) cannot be accessed

### Extension icon not visible

**Solution**: Pin the extension
1. Click the puzzle piece icon (🧩)
2. Find "Terms & Privacy Policy Analyzer"
3. Click the pin icon (📌)

### Analysis takes too long

**Causes**:
- Using GPT-4 (slower but more accurate)
- Large document being analyzed
- OpenAI API experiencing delays

**Solutions**:
- Switch to GPT-3.5 Turbo for faster results
- Be patient - analysis can take 10-20 seconds
- Check [OpenAI Status](https://status.openai.com)

---

## Usage Tips

### 💡 Best Practices

1. **Choose the Right Model**
   - Use GPT-3.5 Turbo for quick checks
   - Use GPT-4 for important documents

2. **Review Results Carefully**
   - AI isn't perfect - use your judgment
   - Read the full document for critical decisions
   - Consider consulting a lawyer for important matters

3. **Monitor API Usage**
   - Check usage at [platform.openai.com/usage](https://platform.openai.com/usage)
   - Set up billing alerts to avoid surprises
   - Each analysis typically costs $0.001-0.03

4. **Privacy Conscious**
   - Document text is sent to OpenAI
   - Don't analyze confidential documents
   - API key is stored locally in your browser

### 🎯 When to Use This Extension

✅ **Good Use Cases:**
- Reviewing app privacy policies before signing up
- Checking website terms of service
- Comparing privacy policies between services
- Educational purposes

❌ **Not Recommended For:**
- Legal advice (consult a lawyer instead)
- Confidential or sensitive documents
- Final decision-making without human review

---

## Uninstalling

If you need to remove the extension:

1. Go to `chrome://extensions/`
2. Find "Terms & Privacy Policy Analyzer"
3. Click "Remove"
4. Confirm removal

Your API key and settings will be deleted from your browser.

---

## Next Steps

- ⭐ Star the repository on GitHub
- 📝 Report issues or suggest features
- 🤝 Contribute to the project
- 📖 Read the full [README](EXTENSION_README.md)

---

## Support

Need help? 

- 📖 Check the [README](EXTENSION_README.md)
- 🐛 [Report an issue](https://github.com/anom1909/skills-idea-to-app-with-spark/issues)
- 💬 Check [OpenAI API documentation](https://platform.openai.com/docs)

---

**Happy analyzing! Stay safe online! 🔒**
