# Terms & Privacy Policy Analyzer - Chrome Extension

An AI-powered Chrome extension that reads and analyzes Terms of Use and Privacy Policy documents to identify potentially dangerous or concerning terms.

## 🌟 Features

- **AI-Powered Analysis**: Uses OpenAI's GPT models to intelligently analyze legal documents
- **Dangerous Term Detection**: Identifies concerning clauses such as:
  - Data sharing and selling practices
  - Forced arbitration clauses
  - Automatic renewal terms
  - Indefinite data retention
  - Broad liability waivers
  - Tracking and surveillance
  - Unfair or one-sided terms
- **Severity Ratings**: Categorizes findings as High, Medium, or Low risk
- **One-Click Analysis**: Analyze any webpage with a single click
- **Privacy-Focused**: Your API key and data stay in your browser
- **Beautiful UI**: Modern, intuitive interface

## 📋 Prerequisites

- Google Chrome or any Chromium-based browser (Edge, Brave, etc.)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## 🚀 Installation

### Method 1: Load Unpacked Extension (Development)

1. **Download or Clone this Repository**
   ```bash
   git clone https://github.com/anom1909/skills-idea-to-app-with-spark.git
   cd skills-idea-to-app-with-spark
   ```

2. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions/`
   - Or click Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the repository folder containing `manifest.json`

5. **Pin the Extension**
   - Click the puzzle icon in Chrome's toolbar
   - Find "Terms & Privacy Policy Analyzer"
   - Click the pin icon to keep it visible

### Method 2: Install from Chrome Web Store (Coming Soon)

_Extension will be published to Chrome Web Store soon._

## ⚙️ Configuration

1. **Get an OpenAI API Key**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create an account if you don't have one
   - Generate a new API key

2. **Configure the Extension**
   - Click the extension icon in Chrome
   - Click "Settings" or the gear icon
   - Enter your OpenAI API key
   - Select your preferred model:
     - **GPT-3.5 Turbo**: Faster and cheaper (recommended)
     - **GPT-4**: More accurate but expensive
     - **GPT-4 Turbo**: Balanced option
   - Click "Save Settings"

## 💡 Usage

1. **Navigate to a Terms of Service or Privacy Policy page**
   - Examples: Twitter Privacy Policy, Facebook Terms, etc.

2. **Click the Extension Icon**
   - The popup will open

3. **Click "Analyze Page"**
   - The extension will extract text from the current page
   - Send it to OpenAI for analysis
   - Display the results with severity ratings

4. **Review the Results**
   - High-risk items are highlighted in red
   - Medium-risk items are shown in yellow
   - Low-risk items are displayed in green
   - Each finding includes a description and relevant quote

## 📊 Understanding Results

### Severity Levels

- **🔴 High Risk**: Serious concerns that could significantly impact your privacy, rights, or finances
- **🟡 Medium Risk**: Notable issues that warrant attention
- **🟢 Low Risk**: Minor concerns or informational items

### Common Findings

The extension looks for:

1. **Data Selling Practices**: Whether your data is sold to third parties
2. **Third-party Sharing**: How your data is shared with other companies
3. **Tracking & Surveillance**: What user activities are tracked
4. **Automatic Renewals**: Subscription terms that auto-renew
5. **Forced Arbitration**: Clauses that limit your right to sue
6. **Data Retention**: How long your data is kept
7. **Terms Changes**: Whether terms can be modified without notice
8. **User Content Rights**: Who owns the content you create
9. **Liability Waivers**: What the company is not responsible for

## 🔒 Privacy & Security

- **Local Storage**: Your API key is stored only in your browser
- **No Data Collection**: We don't collect or store any of your data
- **Direct API Calls**: Text is sent directly to OpenAI, not through our servers
- **Open Source**: All code is available for review

## 🛠️ Technical Details

### Architecture

- **Manifest V3**: Uses the latest Chrome extension standard
- **Content Scripts**: Extract text from web pages
- **Background Service Worker**: Handles API communication
- **Chrome Storage API**: Securely stores settings locally

### Files

```
├── manifest.json          # Extension configuration
├── popup.html            # Main popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup logic
├── content.js            # Content script for text extraction
├── background.js         # Background service worker
├── settings.html         # Settings page
├── settings.js           # Settings logic
└── icons/                # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### API Usage

The extension uses OpenAI's Chat Completions API with:
- **Temperature**: 0.3 (for consistent results)
- **Max Tokens**: 2000
- **Response Format**: JSON

## 🔧 Development

### Prerequisites for Development

- Node.js (optional, for future testing)
- Chrome or Chromium-based browser

### Testing

1. Load the extension in developer mode
2. Navigate to test pages (e.g., privacy policy pages)
3. Open Chrome DevTools (F12) to see console logs
4. Test the analysis functionality

### Debugging

- Check the Console in popup inspector (right-click popup → Inspect)
- Check the Service Worker logs in `chrome://extensions/`
- Review network requests in DevTools

## 📝 Known Limitations

- **API Rate Limits**: Subject to OpenAI API rate limits
- **Text Length**: Analyzes first 15,000 characters (can be adjusted)
- **Accuracy**: AI analysis may occasionally miss or misinterpret terms
- **Language**: Currently optimized for English documents
- **API Costs**: Using the OpenAI API incurs costs based on usage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with GitHub Copilot
- Powered by OpenAI's GPT models
- Icons created with Python PIL

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the OpenAI API documentation for API-related problems

## 🔮 Future Enhancements

Planned features:
- [ ] Highlight dangerous terms directly on the page
- [ ] Export analysis results as PDF
- [ ] Compare multiple privacy policies
- [ ] Historical tracking of policy changes
- [ ] Multi-language support
- [ ] Alternative LLM providers (Anthropic, local models)
- [ ] Browser action badge with risk score
- [ ] Analysis history dashboard

## 📊 Version History

### v1.0.0 (Current)
- Initial release
- OpenAI GPT integration
- Basic term detection
- Severity classification
- Settings page
- Modern UI

---

Made with ❤️ for protecting user privacy
