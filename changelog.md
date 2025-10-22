# Changelog

All notable changes to the Banana plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-10-22

### Added
- Initial release of Banana plugin
- Automatic color coding based on task age
- Three color schemes:
  - 🍏 Green for fresh tasks (0-3 days)
  - 🍌 Yellow for moderate age tasks (3-7 days)
  - 🍂 Orange for old tasks (7+ days)
- Age badges displaying task age in days
- Emoji indicators for each age category
- Real-time updates via MutationObserver
- Automatic refresh every minute
- Smooth CSS animations and hover effects
- Customizable age thresholds via JavaScript
- Customizable colors via CSS
- Translation support (English included)
- Compatible with Kanboard >= 1.2.20
- MIT License
- Comprehensive documentation:
  - README with installation instructions
  - Quick start guide
  - Customization examples
  - Troubleshooting section

### Technical Details
- Namespace: `Kanboard\Plugin\Banana`
- Hook system integration for CSS and JavaScript
- Multiple methods for detecting task creation dates
- Debounced DOM observation for performance
- Global API exposed as `window.Banana`

[Unreleased]: https://github.com/yourusername/kanboard-plugin-banana/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/yourusername/kanboard-plugin-banana/releases/tag/v1.0.0
