# 🍌 Banana - Kanboard Plugin

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Kanboard](https://img.shields.io/badge/Kanboard-%3E%3D1.2.20-brightgreen.svg)](https://github.com/kanboard/kanboard)
[![GitHub release](https://img.shields.io/github/release/YOUR-USERNAME/kanboard-plugin-banana.svg)](https://github.com/YOUR-USERNAME/kanboard-plugin-banana/releases)

Automatically color-codes Kanboard task cards by age—green for fresh (0-3 days), yellow for moderate (3-7 days), and orange for stale (7+ days)—to help teams spot aging tasks at a glance.

---

## ✨ Features

- 🍏 **Fresh Tasks (0-3 days)**: Bright green gradient with fresh banana emoji
- 🍌 **Moderate Tasks (3-7 days)**: Yellow gradient with ripe banana emoji
- 🍂 **Stale Tasks (7+ days)**: Orange/brown gradient with overripe emoji
- 📅 **Age Badges**: Shows exact task age (e.g., "🍌 5 days")
- ⚡ **Real-Time Updates**: Automatically refreshes as tasks age
- 🎨 **Smooth Animations**: Beautiful hover effects and transitions
- ⚙️ **Fully Customizable**: Easy to change colors and age thresholds
- 🌍 **Translation Ready**: Supports multiple languages

---

## 📸 Screenshots

### Fresh Task (Green)
Fresh tasks appear in a vibrant green gradient, indicating they're new and don't need immediate attention.

### Moderate Task (Yellow)
Tasks turning yellow signal they're getting older—time to check in on progress.

### Stale Task (Orange)
Orange tasks are overdue for attention—perfect for spotting bottlenecks.

> **Note**: Add your own screenshots by taking images of your Kanboard with the plugin active!

---

## 🚀 Installation

### Requirements
- Kanboard >= 1.2.20
- PHP >= 7.4
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Method 1: Download from Releases (Recommended)

1. Download the latest release: [Banana-Plugin.zip](https://github.com/YOUR-USERNAME/kanboard-plugin-banana/releases/latest)
2. Extract the zip file
3. Copy the `Banana` folder to your Kanboard `plugins` directory:
   ```
   /path/to/kanboard/plugins/Banana/
   ```
4. Restart your web server or refresh Kanboard
5. The plugin activates automatically!

### Method 2: Clone from GitHub

```bash
cd /path/to/kanboard/plugins/
git clone https://github.com/YOUR-USERNAME/kanboard-plugin-banana.git Banana
```

### Method 3: Docker Installation

```bash
# Copy plugin to container
docker cp Banana/ kanboard:/var/www/app/plugins/

# Set permissions
docker exec kanboard chown -R www-data:www-data /var/www/app/plugins/Banana

# Restart container
docker restart kanboard
```

### Verify Installation

1. Log into Kanboard
2. Go to **Settings** → **Plugins**
3. You should see "Banana" listed as installed
4. Visit any project board—task cards will now be color-coded!

---

## ⚙️ Configuration

The plugin works out of the box, but you can customize it to fit your workflow.

### Change Age Thresholds

Edit `plugins/Banana/Assets/js/banana-age.js` (around line 12):

```javascript
const AGE_THRESHOLDS = {
    FRESH: 3,      // Change to 2 for 0-2 days = green
    MODERATE: 7    // Change to 5 for 2-5 days = yellow
};
```

### Customize Colors

Edit `plugins/Banana/Assets/css/banana-age.css`:

```css
/* Fresh tasks - customize these colors */
.banana-age-fresh {
    background: linear-gradient(135deg, #d4f1d4 0%, #a8e6a8 100%) !important;
    border-left: 5px solid #4caf50 !important;
}

/* Moderate tasks */
.banana-age-moderate {
    background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%) !important;
    border-left: 5px solid #fbc02d !important;
}

/* Stale tasks */
.banana-age-old {
    background: linear-gradient(135deg, #ffccbc 0%, #ffab91 100%) !important;
    border-left: 5px solid #ff5722 !important;
}
```

### Remove Emoji Indicators

Comment out the emoji sections in `banana-age.css`:

```css
/* .banana-age-fresh::before {
    content: "🍏 ";
} */
```

---

## 🎯 Use Cases

Perfect for teams who want to:
- ✅ Identify stale tasks at a glance
- ✅ Improve time management and workflow visibility
- ✅ Prevent tasks from being forgotten or stuck
- ✅ Visualize workflow bottlenecks
- ✅ Maintain task freshness across projects
- ✅ Track sprint velocity and task aging

---

## 🔧 How It Works

1. **JavaScript scans** all task cards on the board
2. **Calculates age** based on task creation date (in days)
3. **Applies CSS classes** based on age thresholds
4. **Adds age badges** showing exact task age
5. **Updates automatically** via MutationObserver and timer
6. **Refreshes every minute** to keep colors current

### Technical Details

- **Namespace**: `Kanboard\Plugin\Banana`
- **Hooks**: Uses `template:layout:css` and `template:layout:js`
- **Performance**: Debounced DOM observation for efficiency
- **Compatibility**: Works with ColorManager and other plugins

---

## 🤝 Compatibility

### ✅ Works With
- Kanboard >= 1.2.20
- [ColorManager](https://github.com/aljawaid/ColorManager) (complementary!)
- [KanboardCSS](https://github.com/aljawaid/KanboardCSS)
- Most Kanboard themes and plugins

### 🧪 Tested On
- Chrome, Firefox, Safari, Edge
- Docker installations
- Manual installations (Linux, macOS, Windows)

---

## 🐛 Troubleshooting

### Plugin doesn't appear in Settings?

**Check folder name:**
```bash
ls /path/to/kanboard/plugins/
# Should show "Banana" (capital B)
```

**Verify Plugin.php exists:**
```bash
ls /path/to/kanboard/plugins/Banana/Plugin.php
```

**Check permissions (Linux/Mac):**
```bash
chmod -R 755 /path/to/kanboard/plugins/Banana
chown -R www-data:www-data /path/to/kanboard/plugins/Banana
```

### Colors not appearing?

1. **Clear browser cache**: Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
2. **Check JavaScript console**: Press `F12` → Console tab, look for errors
3. **Verify files loaded**: Press `F12` → Network tab, reload page, look for `banana-age.css` and `banana-age.js`

### Age badges not showing?

The plugin attempts multiple methods to find task creation dates. If badges don't appear:
- Ensure your Kanboard version is >= 1.2.20
- Check that tasks have creation dates set
- Verify JavaScript is enabled in your browser

---

## 🛠️ Development

### Project Structure

```
Banana/
├── Plugin.php                    # Main registration file
├── Assets/
│   ├── css/
│   │   └── banana-age.css       # Styling and colors
│   └── js/
│       └── banana-age.js        # Age detection and coloring
├── Locale/
│   └── en_US/
│       └── translations.php     # English translations
├── .gitignore
├── CHANGELOG.md
├── LICENSE
└── README.md
```

### Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please ensure your code:
- Follows Kanboard plugin standards
- Includes comments for complex logic
- Updates documentation as needed

### Reporting Issues

Found a bug? Have a feature request? [Open an issue](https://github.com/YOUR-USERNAME/kanboard-plugin-banana/issues)!

Please include:
- Kanboard version
- PHP version
- Browser and OS
- Steps to reproduce
- Screenshots if applicable

---

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and release notes.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits

- **Inspired by**: [ColorManager](https://github.com/aljawaid/ColorManager) by @aljawaid
- **Built for**: The Kanboard community
- **Based on**: Official Kanboard plugin patterns and best practices

---

## 🌟 Support

If you find this plugin helpful, please:
- ⭐ Star this repository
- 🐛 Report bugs and request features via [Issues](https://github.com/YOUR-USERNAME/kanboard-plugin-banana/issues)
- 💬 Share your experience on the [Kanboard Forum](https://kanboard.discourse.group/)
- 🍌 Tell your team about it!

---

## 🔗 Links

- **Kanboard**: https://kanboard.org/
- **Documentation**: https://docs.kanboard.org/
- **Forum**: https://kanboard.discourse.group/
- **Plugin Directory**: https://kanboard.org/plugins.html

---

<p align="center">
  Made with 🍌 for better task management
</p>

<p align="center">
  <sub>Spot those aging tasks before they become a problem!</sub>
</p>
