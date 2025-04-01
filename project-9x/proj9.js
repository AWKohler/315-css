/**
 * Page Customizer Application
 * 
 * This script enables users to customize the page appearance (background color, text color, and font size)
 * through a form. The customization settings are stored in both URL query strings and cookies.
 * 
 * Features:
 * - Loads settings from URL query parameters when the page loads
 * - Falls back to cookie settings if no URL parameters aer provided
 * - Saves settings as cookies when a form is submitted
 * - Updates the URL with the new settings via query string
 * - Applies the visual changes to the page based on selected settings
 * - Displays the users current settings to the user
 * - cookie expiration
 */

// DOM Elements
const form = document.getElementById('customizeForm');
const bgColorSelect = document.getElementById('bgColor');
const textColorSelect = document.getElementById('textColor');
const fontSizeSelect = document.getElementById('fontSize');
const currentSettingsDisplay = document.getElementById('current-settings');

// Default settings
const defaultSettings = {
    bgColor: '#ffffff',
    textColor: '#000000',
    fontSize: '16px'
};

// Cookie expiration time (7 days in milliseconds)
const COOKIE_EXPIRATION = 7 * 24 * 60 * 60 * 1000;

/**
 * Set a cookie with expiration date
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} expirationDays - Number of days until cookie expires
 */
function setCookie(name, value, expirationDays) {
    const date = new Date();
    date.setTime(date.getTime() + expirationDays);
    const expires = "expires=" + date.toUTCString();
    // Build cookie
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
 * Get a cookie by name
 * @param {string} name - Cookie name to retrieve
 * @return {string} Cookie value or empty string if not found
 */
function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    
    // parse
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();

        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

/**
 * Parse URL query parameters
 * @return {Object} Object containing the query parameters
 */
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    
    for (let i = 0; i < pairs.length; i++) {
        if (pairs[i] === "") continue;
        
        const pair = pairs[i].split('=');
        // Decode the parameter values
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    
    return params;
}

/**
 * Apply settings to the page
 * @param {Object} settings - Object containing bgColor, textColor, and fontSize
 */
function applySettings(settings) {
    // Apply settings to page elements
    document.body.style.backgroundColor = settings.bgColor;
    document.body.style.color = settings.textColor;
    document.body.style.fontSize = settings.fontSize;
    
    // Update form selections to match current settings
    bgColorSelect.value = settings.bgColor;
    textColorSelect.value = settings.textColor;
    fontSizeSelect.value = settings.fontSize;
    
    // Display current settings to user
    currentSettingsDisplay.textContent = 
        `Background: ${settings.bgColor} | Text: ${settings.textColor} | Font Size: ${settings.fontSize}`;
}

/**
 * Save settings to cookies
 * @param {Object} settings - Settings to save
 */
function saveSettingsToCookies(settings) {
    setCookie('bgColor', settings.bgColor, COOKIE_EXPIRATION);
    setCookie('textColor', settings.textColor, COOKIE_EXPIRATION);
    setCookie('fontSize', settings.fontSize, COOKIE_EXPIRATION);
}

/**
 * Update URL with current settings
 * @param {Object} settings - Settings to include in URL
 */
function updateURL(settings) {
    // Build the new URL usign URL object
    const url = new URL(window.location.href);
    url.searchParams.set('bgColor', settings.bgColor);
    url.searchParams.set('textColor', settings.textColor);
    url.searchParams.set('fontSize', settings.fontSize);
    
    // Update URL without reloading the page
    window.history.pushState({}, '', url);
}

/**
 * Load settings from cookies
 * @return {Object} Settings object with values from cookies
 */
function loadSettingsFromCookies() {
    const settings = {...defaultSettings};
    
    const bgColor = getCookie('bgColor');
    const textColor = getCookie('textColor');
    const fontSize = getCookie('fontSize');
    
    if (bgColor) settings.bgColor = bgColor;
    if (textColor) settings.textColor = textColor;
    if (fontSize) settings.fontSize = fontSize;
    
    return settings;
}

/**
 * Initialize the page with settings from URL parameters or cookies
 */
function initializePage() {
    // First check URL parameters
    const queryParams = getQueryParams();
    const settings = {...defaultSettings};
    
    // Use URL parameters if available
    if (queryParams.bgColor) settings.bgColor = queryParams.bgColor;
    if (queryParams.textColor) settings.textColor = queryParams.textColor;
    if (queryParams.fontSize) settings.fontSize = queryParams.fontSize;
    
    // If no URL parameters, try to load from cookies
    if (Object.keys(queryParams).length === 0) {
        const cookieSettings = loadSettingsFromCookies();
        Object.assign(settings, cookieSettings);
    }
    
    // Apply the settings to the page
    applySettings(settings);
    
    // Save settings to cookies for future visits
    saveSettingsToCookies(settings);
    
    // Update URL if it doesn't already have the parameters
    if (Object.keys(queryParams).length === 0) {
        updateURL(settings);
    }
}

// Form submission event handler
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get current settings from form
    const settings = {
        bgColor: bgColorSelect.value,
        textColor: textColorSelect.value,
        fontSize: fontSizeSelect.value
    };
    
    // Apply settings to the page
    applySettings(settings);
    
    // Save settings to cookies
    saveSettingsToCookies(settings);
    
    // Update URL with new settings
    updateURL(settings);
});

// Initialize the page when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);