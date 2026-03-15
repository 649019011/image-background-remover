# 🎨 AI Background Remover

An AI-powered tool to remove image backgrounds instantly. Simple, fast, and free to use.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- **Fast Processing**: Remove backgrounds in seconds using AI
- **Easy to Use**: Drag and drop interface
- **Multiple Formats**: Supports JPG, PNG, and WebP
- **High Quality**: Transparent background output
- **Privacy Focused**: No data is stored on our servers
- **Responsive**: Works on desktop and mobile devices

## 🚀 Demo

Live demo coming soon!

## 🛠️ How It Works

1. Upload an image (drag & drop or click to browse)
2. Click "Remove Background"
3. Download your image with transparent background

## 🔑 Getting Started

### Prerequisites

- A remove.bg API key (get free API key at [remove.bg](https://www.remove.bg/api))
- A web server to host the application

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/649019011/image-background-remover.git
   cd image-background-remover
   ```

2. **Get your remove.bg API key**

   - Visit [remove.bg](https://www.remove.bg/api)
   - Sign up for a free account
   - Get your API key (50 free credits per month)

3. **Configure the API key**

   Open `app.js` and replace `YOUR_REMOVE_BG_API_KEY` with your actual API key:

   ```javascript
   const API_KEY = 'your-actual-api-key-here';
   ```

4. **Run locally**

   You can use any web server to serve the files. For example, using Python:

   ```bash
   # Python 3
   python -m http.server 8000
   ```

   Or using Node.js:

   ```bash
   npx serve
   ```

   Then open `http://localhost:8000` in your browser.

### Deployment

#### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install -g gh-pages

# Deploy
gh-pages -d .
```

## 📁 Project Structure

```
image-background-remover/
├── index.html      # Main HTML file
├── style.css       # Styles
├── app.js          # JavaScript logic
└── README.md       # This file
```

## 🎯 Features

### Current Features
- ✅ Drag and drop image upload
- ✅ File validation (type and size)
- ✅ Background removal using remove.bg API
- ✅ Image preview (original and result)
- ✅ Download processed image as PNG
- ✅ Responsive design
- ✅ Error handling

### Planned Features
- ⏳ Batch processing
- ⏳ Background replacement options
- ⏳ Usage tracking and limits
- ⏳ Payment integration
- ⏳ Multi-language support

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 Pricing

**remove.bg API Pricing:**
- Free: 50 credits/month
- Pay-as-you-go: $0.20 per image
- Premium: From $9/month for 1000 images

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [remove.bg](https://www.remove.bg) for the amazing AI background removal API
- [Cloudflare](https://www.cloudflare.com) for inspiration

## 📞 Support

For issues and questions, please open an issue on GitHub.

## 🔗 Links

- [GitHub Repository](https://github.com/649019011/image-background-remover)
- [remove.bg API](https://www.remove.bg/api)
- [remove.bg Pricing](https://www.remove.bg/pricing)

---

Made with ❤️ by [乘风](https://github.com/649019011)
