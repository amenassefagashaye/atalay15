/**
 * AMHARIC ENTERPRISE RICH OVERLAY TOOLTIP SYSTEM
 * Version: 1.0.0
 * Description: Floating text tooltips with no borders/backgrounds for all UI elements
 */

(function() {
    'use strict';
    
    // ==================== AMHARIC TOOLTIP DICTIONARY ====================
    const amharicTooltips = {
        // Navigation
        'navRegisterStock': '📦 አዲስ መድሀኒት ለመመዝገብ - ስም፣ ባች፣ ዋጋ፣ ብዛት፣ ጊዜ ማብቂያ ያስፈልጋል',
        'navSales': '💰 ሽያጭ ለመሸጥ - ደንበኛ፣ መጠን፣ ክፍያ ዘዴ ይምረጡ',
        'navCurrentStock': '📋 የአሁኑ ክምችት - ዝርዝር መረጃ ለማየት',
        'navReduceStock': '📉 ክምችት መቀነስ - ለተለያዩ ምክንያቶች (ቆሻሻ፣ ጉዳት፣ ማብቂያ)',
        'navReview': '📊 ግምገማ - ሽያጭ፣ ትርፍ፣ ኪሳራ ሪፖርት',
        'navAudit': '🔍 ኦዲት - የክምችት ልዩነት መመርመሪያ',
        
        // Register Form Fields
        'itemName': '🏷️ የመድሀኒት አጠቃላይ ስም - ለምሳሌ፡ ፓራሲታሞል, አሚኦክሲሲሊን',
        'brandName': '®️ የንግድ ስም - ኩባንያው የሰጠው ስም፣ ለምሳሌ፡ ፓናዶል, አሙክላቭ',
        'category': '📂 ምድብ - ፀረ ተውሳክ፣ የህመም ማስታገሻ፣ ንቁ ንጥረ ነገር',
        'itemType': '🔖 አይነት - መድሀኒት፣ መሳሪያ፣ ማሟያ',
        'baseUnit': '⚖️ መሰረታዊ ክፍል - tablet፣ ml፣ mg - ለስሌት የሚጠቅም',
        'registeredUnit': '📦 የምዝገባ ክፍል - box፣ strip፣ bottle - ሲገዙ የሚጠቀሙበት',
        'displayUnit': '👁️ ማሳያ ክፍል - ለደንበኛ የሚታየው ክፍል',
        'registeredToBaseFactor': '🔢 ምዝገባ ወደ መሰረት ምክንያት - በአንድ ሳጥን ውስጥ ስንት ጡባዊ አለ? ለምሳሌ 1 box = 100 tablets',
        'displayToBaseFactor': '🔢 ማሳያ ወደ መሰረት ምክንያት - ለምሳሌ 1 strip = 10 tablets',
        'allowFractionalDisplay': '🔢 ክፍልፋይ መፍቀድ - ለምሳሌ 0.5 ጡባዊ መሸጥ ከፈለጉ "አዎ" ይምረጡ',
        'initialQuantity': '🔢 የመጀመሪያ ብዛት - ምን ያህል እንደሚገባ ያስገቡ',
        'purchasePricePerDisplay': '💰 የግዢ ዋጋ በአንድ ማሳያ ክፍል - ስንገዛ የምንከፍለው',
        'sellingPricePerDisplay': '💵 የሽያጭ ዋጋ - ለደንበኛ የምንሸጥበት',
        'markup': '📈 ትርፍ መቶኛ - ከግዢ ዋጋ ላይ የምንጨምረው፣ ለምሳሌ 50% ትርፍ',
        'discountPercent': '🏷️ ቅናሽ - ለደንበኛ የምንሰጠው ቅናሽ መቶኛ',
        'batchNumber': '🔢 የባች ቁጥር - አምራቹ የሰጠው መለያ',
        'expiryDate': '⏰ ጊዜ ማብቂያ - ከዚህ ቀን በኋላ መሸጥ አይቻልም',
        'supplier': '🚚 አቅራቢ - ማን እንዳቀረበ',
        'invoiceNumber': '📄 የደረሰኝ ቁጥር - ለግዢ ማስረጃ',
        'minStockDisplay': '⚠️ ዝቅተኛ ክምችት - ከዚህ በታች ሲወርድ ማንቂያ',
        'maxStockDisplay': '📈 ከፍተኛ ክምችት - ከዚህ በላይ መያዝ አይመከርም',
        'reorderLevelDisplay': '🔄 እንደገና ማዘዣ ደረጃ - ደርሶ ሲደርስ አዲስ ማዘዝ ያስፈልጋል',
        
        // Sales Form Fields
        'salesDate': '📅 የሽያጭ ቀን - ሽያጩ መቼ እንደተደረገ',
        'salesBranch': '🏪 ቅርንጫፍ - ፋርማሲ ወይም ጅምላ ሻጭ',
        'salesPaymentMethod': '💳 የክፍያ ዘዴ - ጥሬ ገንዘብ፣ ካርድ፣ ሞባይል፣ ብድር፣ ኢንሹራንስ',
        'customerName': '👤 የደንበኛ ስም - አማራጭ ፣ ለሪፖርት',
        'salesperson': '🧑‍💼 ሻጩ - ሽያጩን ያከናወነው ሰው',
        
        // Dashboard Cards
        'totalSales': '💰 አጠቃላይ ሽያጭ - በዚህ ወቅት የተገኘ ገቢ',
        'lowStockItems': '⚠️ ዝቅተኛ ክምችት ያላቸው እቃዎች - ማዘዝ ያስፈልጋል',
        'nearExpiryItems': '⏰ ጊዜያቸው በቅርቡ የሚያበቃ - በ30-90 ቀናት ውስጥ',
        'expiredItems': '❌ ጊዜያቸው ያለፈ - ኪሳራ ሆኗል',
        'inventoryTurnover': '🔄 የክምችት መዞር - ክምችት ምን ያህል ጊዜ ተሸጧል',
        'stockAccuracy': '🎯 የክምችት ትክክለኛነት - ከሚጠበቀው ጋር ሲነጻጸር',
        
        // Share Feature
        'shareIcon': '📤 ሪፖርት ለአሰፋ ጋሻዬ (@assegas) ማጋራት - ከሌሎች ፋርማሲዎች ጋር ልውውጥ ለማድረግ',
        'shareSenderName': '✍️ ላኪ ስም እና ስልክ - እርስዎን ለመለየት፣ ለምሳሌ አለማየሁ በቀለ - 0912345678',
        
        // Import Feature
        'importDataBtn': '📥 መረጃ ማምጣት - ከሌሎች ፋይሎች ወይም ምንጮች መረጃ ለማምጣት፣ እያንዳንዱን መስክ በራስ ይሞላል',
        
        // Audit
        'auditBeginningBalance': '🏁 የመጀመሪያ ቀሪ እሴት - በወሩ መጀመሪያ የነበረው የክምችት ዋጋ',
        'auditNetVariance': '📊 የተጣራ ልዩነት - ትርፍ ወይም ኪሳራ ከተጠበቀው ጋር',
        'auditRecommendation': '💡 ምክር - ምን ማድረግ እንዳለበት የሚጠቁም',
        
        // Generic table elements
        'stockTable_qty': '📊 የአሁኑ ክምችት - ለሽያጭ ዝግጁ',
        'stockTable_variance': '📉 ልዩነት - ከሚጠበቀው እና ከተቆጠረው መካከል',
        'stockTable_ending': '🏁 የማጠቃሚያ ቀሪ - በወሩ መጨረሻ'
    };
    
    // ==================== TOOLTIP MANAGER CLASS ====================
    class AmharicTooltipManager {
        constructor() {
            this.activeTooltip = null;
            this.tooltipTimeout = null;
            this.init();
        }
        
        init() {
            this.addTooltipsToElements();
            this.setupDynamicTooltips();
            this.addTooltipStyles();
        }
        
        addTooltipStyles() {
            if (document.getElementById('amharic-tooltip-styles')) return;
            
            const style = document.createElement('style');
            style.id = 'amharic-tooltip-styles';
            style.textContent = `
                @keyframes tooltipFloatIn {
                    from {
                        opacity: 0;
                        transform: translateY(-8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .amharic-tooltip {
                    position: fixed;
                    z-index: 1000000;
                    animation: tooltipFloatIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    pointer-events: none;
                    max-width: 400px;
                }
                
                .amharic-tooltip-content {
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                    padding: 8px 16px;
                    font-family: 'Times New Roman', Times, serif;
                    font-size: 13px;
                    line-height: 1.5;
                    color: #ffd700;
                    text-shadow: 0 0 15px rgba(0, 0, 0, 0.9);
                    backdrop-filter: none;
                    background: transparent;
                    pointer-events: auto;
                    white-space: normal;
                    word-wrap: break-word;
                }
                
                .amharic-tooltip-close {
                    position: absolute;
                    top: 2px;
                    right: 2px;
                    cursor: pointer;
                    font-size: 11px;
                    color: #ffd700;
                    background: transparent;
                    border: none;
                    pointer-events: auto;
                    opacity: 0.6;
                    transition: opacity 0.2s;
                }
                
                .amharic-tooltip-close:hover {
                    opacity: 1;
                }
                
                [data-amharic-tooltip] {
                    cursor: help;
                }
            `;
            document.head.appendChild(style);
        }
        
        addTooltipsToElements() {
            // Add tooltips by ID
            for (const [elementId, tooltipText] of Object.entries(amharicTooltips)) {
                const element = document.getElementById(elementId);
                if (element && !element.hasAttribute('data-amharic-tooltip')) {
                    element.setAttribute('data-amharic-tooltip', tooltipText);
                    this.attachTooltipEvents(element);
                }
            }
            
            // Add tooltips by class for dynamically generated elements
            const dynamicSelectors = [
                '.dashboard-card', '.audit-summary-item', '.action-btn', 
                '.nav-btn', '.btn', '.form-group input', '.form-group select'
            ];
            
            dynamicSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(element => {
                    if (!element.hasAttribute('data-amharic-tooltip') && element.id) {
                        const tooltipText = amharicTooltips[element.id];
                        if (tooltipText) {
                            element.setAttribute('data-amharic-tooltip', tooltipText);
                            this.attachTooltipEvents(element);
                        }
                    }
                });
            });
        }
        
        attachTooltipEvents(element) {
            if (element._tooltipAttached) return;
            element._tooltipAttached = true;
            
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
            
            element.addEventListener('focus', (e) => {
                this.showTooltip(e.target);
            });
            
            element.addEventListener('blur', () => {
                this.hideTooltip();
            });
        }
        
        setupDynamicTooltips() {
            // Observe DOM changes for dynamically added elements
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
                            if (node.querySelectorAll) {
                                node.querySelectorAll('input, select, button, th, .nav-btn, .dashboard-card').forEach(el => {
                                    if (!el.hasAttribute('data-amharic-tooltip')) {
                                        this.addTooltipsToElements();
                                    }
                                });
                            }
                            if (node.nodeType === 1 && !node.hasAttribute('data-amharic-tooltip')) {
                                this.addTooltipsToElements();
                            }
                        }
                    });
                });
            });
            
            observer.observe(document.body, { childList: true, subtree: true });
        }
        
        showTooltip(element) {
            let tooltipText = element.getAttribute('data-amharic-tooltip');
            if (!tooltipText) {
                // Try to get from parent or label
                const label = element.closest('.form-group')?.querySelector('label');
                if (label && label.textContent) {
                    tooltipText = `📌 ${label.textContent.replace(/[✎*]/g, '').trim()}: ዝርዝር መረጃ ለማግኘት እዚህ ላይ ያንዣብቡ`;
                }
            }
            
            if (!tooltipText) return;
            
            this.hideTooltip();
            
            const tooltip = document.createElement('div');
            tooltip.className = 'amharic-tooltip';
            tooltip.innerHTML = `
                <div class="amharic-tooltip-content">
                    ${this.escapeHtml(tooltipText)}
                    <button class="amharic-tooltip-close" onclick="this.closest('.amharic-tooltip').remove()">✕</button>
                </div>
            `;
            
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = element.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            let top = rect.bottom + 8;
            let left = rect.left;
            
            // Ensure tooltip stays within viewport
            if (top + tooltipRect.height > window.innerHeight) {
                top = rect.top - tooltipRect.height - 8;
            }
            
            if (left + tooltipRect.width > window.innerWidth) {
                left = window.innerWidth - tooltipRect.width - 10;
            }
            
            if (left < 10) left = 10;
            
            tooltip.style.top = top + 'px';
            tooltip.style.left = left + 'px';
            
            this.activeTooltip = tooltip;
            
            // Auto-hide after 6 seconds
            if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
            this.tooltipTimeout = setTimeout(() => {
                this.hideTooltip();
            }, 6000);
        }
        
        hideTooltip() {
            if (this.activeTooltip) {
                this.activeTooltip.remove();
                this.activeTooltip = null;
            }
            if (this.tooltipTimeout) {
                clearTimeout(this.tooltipTimeout);
                this.tooltipTimeout = null;
            }
        }
        
        escapeHtml(str) {
            if (!str) return '';
            return str.replace(/[&<>]/g, function(m) {
                if (m === '&') return '&amp;';
                if (m === '<') return '&lt;';
                if (m === '>') return '&gt;';
                return m;
            }).replace(/\n/g, '<br>');
        }
    }
    
    // ==================== INITIALIZATION ====================
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for main system to load
        setTimeout(() => {
            window.amharicTooltips = new AmharicTooltipManager();
        }, 1000);
    });
})();