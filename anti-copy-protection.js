/**
 * ANTI-COPY PROTECTION SYSTEM
 * Version: 1.0.0
 * Description: Maximum browser-safe protection against copying, debugging, and unauthorized access
 */

(function() {
    'use strict';
    
    // ==================== DISABLE RIGHT-CLICK ====================
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    
    // ==================== DISABLE DEVELOPER SHORTCUTS ====================
    document.addEventListener('keydown', function(e) {
        // F12 key
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+Shift+C (Inspector)
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+S (Save)
        if (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+P (Print)
        if (e.ctrlKey && (e.key === 'p' || e.key === 'P' || e.keyCode === 80)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        
        // Ctrl+C (Copy from protected areas - but allow within inputs)
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.keyCode === 67)) {
            const activeEl = document.activeElement;
            if (!activeEl || (activeEl.tagName !== 'INPUT' && activeEl.tagName !== 'TEXTAREA')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }
    });
    
    // ==================== ANTI-DEBUGGING DETECTION ====================
    let devtoolsOpen = false;
    const devtoolsCheckInterval = 1000;
    
    // Method 1: Check via element property getter
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function() {
            devtoolsOpen = true;
            triggerProtection();
            return '';
        }
    });
    
    function triggerProtection() {
        if (devtoolsOpen) {
            // Clear console
            console.clear();
            
            // Add visual protection
            document.body.style.filter = 'blur(3px)';
            document.body.style.pointerEvents = 'none';
            
            // Show warning
            const warningDiv = document.createElement('div');
            warningDiv.innerHTML = `
                <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                            background: rgba(0,0,0,0.95); color: #ff4444; padding: 20px; border-radius: 10px; 
                            z-index: 999999; text-align: center; font-size: 16px; border: 2px solid #ff4444;">
                    <i class="fas fa-shield-alt" style="font-size: 40px;"></i>
                    <h3>Developer Tools Detected!</h3>
                    <p>Access restricted for security reasons.</p>
                    <button onclick="location.reload()" style="background: #ff4444; color: white; border: none; padding: 10px 20px; margin-top: 10px; cursor: pointer;">
                        Reload Page
                    </button>
                </div>
            `;
            warningDiv.id = 'devtools-warning';
            document.body.appendChild(warningDiv);
            
            // Disable all interactions
            setTimeout(() => {
                if (document.getElementById('devtools-warning')) {
                    location.reload();
                }
            }, 3000);
        }
    }
    
    // Method 2: Check via console logging
    setInterval(() => {
        devtoolsOpen = false;
        console.log(element);
        console.clear();
        
        if (devtoolsOpen) {
            triggerProtection();
        }
    }, devtoolsCheckInterval);
    
    // Method 3: Check window size (devtools often changes window dimensions)
    let windowWidth = window.innerWidth;
    setInterval(() => {
        if (Math.abs(window.innerWidth - windowWidth) > 100) {
            devtoolsOpen = true;
            triggerProtection();
        }
        windowWidth = window.innerWidth;
    }, 2000);
    
    // ==================== DISABLE TEXT SELECTION (except inputs) ====================
    const style = document.createElement('style');
    style.textContent = `
        body:not(.allow-select) {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        
        input, textarea, [contenteditable="true"] {
            -webkit-touch-callout: default;
            -webkit-user-select: text;
            -khtml-user-select: text;
            -moz-user-select: text;
            -ms-user-select: text;
            user-select: text;
        }
    `;
    document.head.appendChild(style);
    
    // ==================== ENCRYPTED LOCAL STORAGE ====================
    const originalSetItem = localStorage.setItem;
    const originalGetItem = localStorage.getItem;
    const originalRemoveItem = localStorage.removeItem;
    
    // Simple XOR encryption (obfuscation layer)
    function encrypt(data) {
        if (!data) return data;
        let result = '';
        const key = 0x55; // XOR key
        for (let i = 0; i < data.length; i++) {
            result += String.fromCharCode(data.charCodeAt(i) ^ key);
        }
        return btoa(result);
    }
    
    function decrypt(data) {
        if (!data) return data;
        try {
            const decoded = atob(data);
            let result = '';
            const key = 0x55;
            for (let i = 0; i < decoded.length; i++) {
                result += String.fromCharCode(decoded.charCodeAt(i) ^ key);
            }
            return result;
        } catch(e) {
            return data;
        }
    }
    
    // Override localStorage methods for app-specific keys
    localStorage.setItem = function(key, value) {
        if (key && (key.startsWith('bp-sms-') || key.startsWith('pharmacy-'))) {
            return originalSetItem.call(localStorage, key, encrypt(value));
        }
        return originalSetItem.call(localStorage, key, value);
    };
    
    localStorage.getItem = function(key) {
        const value = originalGetItem.call(localStorage, key);
        if (key && (key.startsWith('bp-sms-') || key.startsWith('pharmacy-')) && value) {
            return decrypt(value);
        }
        return value;
    };
    
    localStorage.removeItem = function(key) {
        if (key && (key.startsWith('bp-sms-') || key.startsWith('pharmacy-'))) {
            return originalRemoveItem.call(localStorage, key);
        }
        return originalRemoveItem.call(localStorage, key);
    };
    
    // ==================== RUNTIME INTEGRITY CHECKS ====================
    let integrityCheckInterval = null;
    
    function startIntegrityChecks() {
        if (integrityCheckInterval) clearInterval(integrityCheckInterval);
        
        integrityCheckInterval = setInterval(() => {
            // Check if critical functions exist
            if (window.ultraStock) {
                const criticalMethods = ['saveToLocalStorage', 'processSale', 'reduceStock', 'verifyStock'];
                criticalMethods.forEach(method => {
                    if (typeof window.ultraStock[method] !== 'function') {
                        console.warn(`Integrity check failed: ${method} is missing`);
                        // Attempt recovery
                        if (typeof window.ultraStock.reloadSystem === 'function') {
                            window.ultraStock.reloadSystem();
                        } else {
                            location.reload();
                        }
                    }
                });
            }
        }, 30000);
    }
    
    // ==================== HIDE SOURCE CODE INDICATORS ====================
    // Remove any console.log messages from production
    const originalConsoleLog = console.log;
    const originalConsoleWarn = console.warn;
    const originalConsoleInfo = console.info;
    
    console.log = function() {
        // Filter out sensitive logs in production
        const args = Array.from(arguments);
        if (args.some(arg => typeof arg === 'string' && arg.includes('sensitive'))) {
            return;
        }
        originalConsoleLog.apply(console, args);
    };
    
    // ==================== DISABLE DRAG AND DROP COPYING ====================
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    document.addEventListener('drop', function(e) {
        e.preventDefault();
        return false;
    });
    
    // ==================== DISABLE PRINTING (basic protection) ====================
    window.onbeforeprint = function() {
        alert('Printing is disabled for security reasons.');
        return false;
    };
    
    // ==================== INITIALIZATION ====================
    function init() {
        startIntegrityChecks();
        
        // Add class to body when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            document.body.classList.add('allow-select');
        });
        
        // Periodically clear console to remove any debug messages
        setInterval(() => {
            console.clear();
        }, 5000);
    }
    
    // Start protection
    init();
    
    // Expose methods for system integration
    window.security = {
        encrypt: encrypt,
        decrypt: decrypt,
        isProtected: true,
        version: '1.0.0'
    };
})();