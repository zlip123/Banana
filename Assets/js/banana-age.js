/**
 * Banana Plugin - Dynamic Task Card Coloring
 * Colors task cards based on their age
 * 
 * Compatible with Kanboard >= 1.2.20
 */

(function() {
    'use strict';

    // Configuration: Age thresholds in days
    const AGE_THRESHOLDS = {
        FRESH: 3,      // 0-3 days = green/fresh
        MODERATE: 7    // 3-7 days = yellow/moderate, 7+ = orange/old
    };

    /**
     * Calculate the age of a task in days
     */
    function calculateTaskAge(createdTimestamp) {
        const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds
        const created = parseInt(createdTimestamp);
        const diffSeconds = now - created;
        const diffDays = Math.floor(diffSeconds / (60 * 60 * 24));
        return diffDays;
    }

    /**
     * Get age category based on days
     */
    function getAgeCategory(days) {
        if (days <= AGE_THRESHOLDS.FRESH) {
            return 'fresh';
        } else if (days <= AGE_THRESHOLDS.MODERATE) {
            return 'moderate';
        } else {
            return 'old';
        }
    }

    /**
     * Format age for display
     */
    function formatAge(days) {
        if (days === 0) return 'Today';
        if (days === 1) return '1 day';
        return days + ' days';
    }

    /**
     * Get emoji for age category
     */
    function getAgeEmoji(category) {
        const emojis = {
            'fresh': '🍏',
            'moderate': '🍌',
            'old': '🍂'
        };
        return emojis[category] || '';
    }

    /**
     * Apply color coding to task cards
     */
    function colorizeTaskCards() {
        // Find all task cards on the board
        // Kanboard uses .task-board class for task cards
        const taskCards = document.querySelectorAll('.task-board');
        
        taskCards.forEach(function(card) {
            let createdTimestamp = null;
            
            // Method 1: Look for data-task-date-creation attribute
            createdTimestamp = card.getAttribute('data-task-date-creation');
            
            // Method 2: Try data-created attribute
            if (!createdTimestamp) {
                createdTimestamp = card.getAttribute('data-created');
            }
            
            // Method 3: Look for the task ID and try to get data from the card
            if (!createdTimestamp) {
                const taskId = card.getAttribute('data-task-id');
                if (taskId) {
                    // Try to find creation date in the card's data
                    const metaElement = card.querySelector('[data-date-creation]');
                    if (metaElement) {
                        createdTimestamp = metaElement.getAttribute('data-date-creation');
                    }
                }
            }
            
            // Method 4: Parse from visible text if available
            if (!createdTimestamp) {
                const footerElement = card.querySelector('.task-board-footer');
                if (footerElement) {
                    const footerText = footerElement.textContent;
                    // Try to extract timestamp from footer (if displayed)
                    const timestampMatch = footerText.match(/\d{10,}/);
                    if (timestampMatch) {
                        createdTimestamp = timestampMatch[0];
                    }
                }
            }

            // If we found a creation timestamp, apply color coding
            if (createdTimestamp) {
                const age = calculateTaskAge(createdTimestamp);
                const category = getAgeCategory(age);
                
                // Remove any existing age classes
                card.classList.remove('banana-age-fresh', 'banana-age-moderate', 'banana-age-old');
                
                // Add the appropriate class
                card.classList.add('banana-age-' + category);
                
                // Optionally add an age badge
                addAgeBadge(card, age, category);
            } else {
                // If no creation date found, mark as unknown but style as fresh (default)
                card.classList.add('banana-age-fresh');
            }
        });
    }

    /**
     * Add age badge to task card
     */
    function addAgeBadge(card, days, category) {
        // Remove existing badge if present
        const existingBadge = card.querySelector('.banana-age-badge');
        if (existingBadge) {
            existingBadge.remove();
        }

        // Create new badge
        const badge = document.createElement('span');
        badge.className = 'banana-age-badge';
        badge.textContent = getAgeEmoji(category) + ' ' + formatAge(days);
        badge.title = 'Task age: ' + formatAge(days);
        
        // Insert badge into card
        // Try to add it to the title area
        const titleElement = card.querySelector('.task-board-title');
        if (titleElement) {
            // Make title element position relative for badge positioning
            if (window.getComputedStyle(titleElement).position === 'static') {
                titleElement.style.position = 'relative';
            }
            titleElement.appendChild(badge);
        } else {
            // Fallback: add to the card itself
            card.style.position = 'relative';
            card.insertBefore(badge, card.firstChild);
        }
    }

    /**
     * Initialize the plugin
     */
    function init() {
        // Apply colors when page loads
        colorizeTaskCards();
        
        // Re-apply colors when board is updated (drag & drop, etc.)
        // Watch for DOM changes (new tasks added, tasks moved)
        const observer = new MutationObserver(function(mutations) {
            // Debounce the colorize function to avoid excessive calls
            clearTimeout(window.bananaAgeTimeout);
            window.bananaAgeTimeout = setTimeout(colorizeTaskCards, 100);
        });
        
        // Observe the board container
        const boardContainer = document.querySelector('.board') || document.querySelector('body');
        if (boardContainer) {
            observer.observe(boardContainer, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['data-task-date-creation', 'data-created']
            });
        }
        
        // Refresh colors every minute to update age display
        setInterval(colorizeTaskCards, 60000);
        
        // Also refresh on window focus (in case user returns after long time)
        window.addEventListener('focus', colorizeTaskCards);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose colorize function globally for manual refresh if needed
    window.Banana = {
        refresh: colorizeTaskCards,
        version: '1.0.0'
    };

})();
