<?php

namespace Kanboard\Plugin\Banana;

use Kanboard\Core\Plugin\Base;
use Kanboard\Core\Translator;

/**
 * Banana Plugin
 *
 * Automatically colors task cards based on their age:
 * - Green (0-3 days) - Fresh tasks
 * - Yellow (3-7 days) - Moderate age
 * - Brown/Orange (7+ days) - Old tasks
 *
 * @package  Banana
 * @author   Zelda Greenwald
 * @license  MIT
 */
class Plugin extends Base
{
    public function initialize()
    {
        // Add custom CSS to the board
        $this->hook->on('template:layout:css', array('template' => 'plugins/Banana/Assets/css/banana-age.css'));
        
        // Add custom JavaScript to dynamically color cards
        $this->hook->on('template:layout:js', array('template' => 'plugins/Banana/Assets/js/banana-age.js'));
    }

    public function onStartup()
    {
        // Load plugin translations
        Translator::load($this->languageModel->getCurrentLanguage(), __DIR__.'/Locale');
    }

    public function getPluginName()
    {
        return 'Banana';
    }

    public function getPluginDescription()
    {
        return t('Automatically color-codes task cards based on their age (green for new, yellow for moderate, orange/brown for old tasks)');
    }

    public function getPluginAuthor()
    {
        return 'Your Name';
    }

    public function getPluginVersion()
    {
        return '1.0.0';
    }

    public function getPluginHomepage()
    {
        return 'https://github.com/yourusername/kanboard-plugin-banana';
    }

    public function getCompatibleVersion()
    {
        // Compatible with Kanboard >= 1.2.20
        return '>=1.2.20';
    }
}
