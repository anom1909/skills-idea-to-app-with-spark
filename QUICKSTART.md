# Quick Start Guide - Terms & Privacy Policy Analyzer

Get up and running in 5 minutes!

## ⚡ Fast Track Installation

### 1. Install Extension (2 minutes)

```bash
# Clone the repository
git clone https://github.com/anom1909/skills-idea-to-app-with-spark.git
cd skills-idea-to-app-with-spark
```

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select this folder
5. Pin the extension (click 🧩 icon, then 📌)

### 2. Get API Key (2 minutes)

1. Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up/Login
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### 3. Configure Extension (1 minute)

1. Click the extension icon 🔍
2. Click "⚙️ Settings"
3. Paste your API key
4. Select "GPT-3.5 Turbo" (recommended)
5. Click "Save"

## 🎯 First Analysis

### Test with Sample Page

1. Open `test-privacy-policy.html` in Chrome
2. Click the extension icon
3. Click "🔍 Analyze Page"
4. Wait ~10 seconds
5. Review the results!

### Try Real Examples

Click to open and analyze:
- [Twitter Privacy Policy](https://twitter.com/en/privacy)
- [Facebook Terms](https://www.facebook.com/terms)
- [Google Privacy Policy](https://policies.google.com/privacy)

## 📊 Understanding Results

| Color | Risk Level | Meaning |
|-------|-----------|---------|
| 🔴 Red | **High Risk** | Serious concerns - read carefully |
| 🟡 Yellow | **Medium Risk** | Notable issues to be aware of |
| 🟢 Green | **Low Risk** | Minor concerns or FYI |

## 🆘 Common Issues

### "Please configure your API key"
→ Click "Configure now" and enter your OpenAI API key

### "Failed to analyze text"
→ Check your API key and OpenAI account has credits

### No extension icon visible
→ Click the puzzle piece (🧩) and pin the extension

### Analysis is slow
→ Normal! Analysis takes 5-20 seconds depending on model

## 💰 Cost Information

Typical costs per analysis:
- GPT-3.5 Turbo: ~$0.001-0.002 (recommended)
- GPT-4: ~$0.02-0.03 (more accurate)
- GPT-4 Turbo: ~$0.01-0.015 (balanced)

New OpenAI accounts often get $5-18 in free credits!

## 🔐 Privacy & Security

✅ **Safe:**
- API key stored locally in your browser
- No data sent to our servers
- Open source - you can review all code

⚠️ **Note:**
- Document text is sent to OpenAI for analysis
- Don't analyze confidential documents

## 📚 More Information

- **Detailed Guide**: [INSTALLATION.md](INSTALLATION.md)
- **Full Documentation**: [EXTENSION_README.md](EXTENSION_README.md)
- **Report Issues**: [GitHub Issues](https://github.com/anom1909/skills-idea-to-app-with-spark/issues)

## ⚡ Pro Tips

1. **Save Money**: Use GPT-3.5 Turbo for most analyses
2. **Better Results**: Use GPT-4 for complex or important documents
3. **Monitor Usage**: Check [platform.openai.com/usage](https://platform.openai.com/usage)
4. **Stay Updated**: Star the repo to get notified of updates

## 🎉 You're Ready!

Start protecting your privacy by analyzing terms and policies before agreeing to them!

---

**Need help?** Check the [full installation guide](INSTALLATION.md) or [open an issue](https://github.com/anom1909/skills-idea-to-app-with-spark/issues).
