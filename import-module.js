/**
 * IMPORT MODULE FOR PHARMACY STOCK MANAGEMENT SYSTEM
 * Version: 1.0.0
 * Description: Import data from CSV/JSON files with auto-mapping to form fields
 */

(function() {
    'use strict';
    
    // ==================== FIELD MAPPINGS ====================
    const fieldMappings = {
        // Generic/Product Name
        'genericname': 'itemName',
        'productname': 'itemName',
        'itemname': 'itemName',
        'name': 'itemName',
        'medicine': 'itemName',
        'drugname': 'itemName',
        
        // Brand
        'brand': 'brandName',
        'brandname': 'brandName',
        'tradename': 'brandName',
        'manufacturer': 'brandName',
        
        // Category
        'category': 'category',
        'classification': 'category',
        'type': 'itemType',
        'itemtype': 'itemType',
        
        // Units
        'baseunit': 'baseUnit',
        'standardunit': 'baseUnit',
        'registeredunit': 'registeredUnit',
        'purchaseunit': 'registeredUnit',
        'displayunit': 'displayUnit',
        'salesunit': 'displayUnit',
        
        // Factors
        'regtobasefactor': 'registeredToBaseFactor',
        'purchasefactor': 'registeredToBaseFactor',
        'disptobasefactor': 'displayToBaseFactor',
        'salesfactor': 'displayToBaseFactor',
        
        // Prices
        'purchaseprice': 'purchasePricePerDisplay',
        'costprice': 'purchasePricePerDisplay',
        'buyingprice': 'purchasePricePerDisplay',
        'sellingprice': 'sellingPricePerDisplay',
        'salesprice': 'sellingPricePerDisplay',
        'retailprice': 'sellingPricePerDisplay',
        
        // Percentages
        'markup': 'markup',
        'profitpercent': 'markup',
        'discount': 'discountPercent',
        'discountpercent': 'discountPercent',
        
        // Batch & Expiry
        'batchnumber': 'batchNumber',
        'batchno': 'batchNumber',
        'lotnumber': 'batchNumber',
        'expirydate': 'expiryDate',
        'expdate': 'expiryDate',
        'expiration': 'expiryDate',
        
        // Stock Levels
        'minstock': 'minStockDisplay',
        'minimumstock': 'minStockDisplay',
        'maxstock': 'maxStockDisplay',
        'maximumstock': 'maxStockDisplay',
        'reorderlevel': 'reorderLevelDisplay',
        'reorderpoint': 'reorderLevelDisplay',
        
        // Quantity
        'quantity': 'initialQuantity',
        'qty': 'initialQuantity',
        'stock': 'initialQuantity',
        
        // Supplier & Invoice
        'supplier': 'supplier',
        'vendor': 'supplier',
        'invoicenumber': 'invoiceNumber',
        'invoiceno': 'invoiceNumber',
        
        // Registration
        'registrant': 'registrant',
        'registeredby': 'registrant'
    };
    
    // ==================== IMPORT MANAGER ====================
    class ImportManager {
        constructor() {
            this.setupImportButton();
        }
        
        setupImportButton() {
            // Wait for DOM to be ready
            const checkInterval = setInterval(() => {
                const importBtn = document.getElementById('importDataBtn');
                if (importBtn) {
                    clearInterval(checkInterval);
                    importBtn.addEventListener('click', () => this.triggerImport());
                    console.log('Import button initialized');
                }
            }, 500);
        }
        
        triggerImport() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.csv, .json, .xlsx, .xls, .txt';
            input.onchange = (e) => this.handleFileSelect(e);
            input.click();
        }
        
        async handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const fileExt = file.name.split('.').pop().toLowerCase();
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    let importedData = null;
                    const content = e.target.result;
                    
                    switch(fileExt) {
                        case 'json':
                            importedData = JSON.parse(content);
                            break;
                        case 'csv':
                        case 'txt':
                            importedData = this.parseCSV(content);
                            break;
                        default:
                            this.showNotification('Unsupported file format. Please use CSV or JSON.', 'warning');
                            return;
                    }
                    
                    if (importedData && importedData.length > 0) {
                        this.mapToForm(importedData[0]);
                        this.showNotification(`Successfully imported data from ${file.name}`, 'success');
                    } else {
                        this.showNotification('No valid data found in file', 'warning');
                    }
                } catch (error) {
                    this.showNotification('Error parsing file: ' + error.message, 'danger');
                }
            };
            
            reader.readAsText(file);
        }
        
        parseCSV(csvText) {
            const lines = csvText.split(/\r?\n/);
            if (lines.length < 2) return [];
            
            // Parse headers (handle quoted fields)
            let headers = this.parseCSVLine(lines[0]);
            headers = headers.map(h => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
            
            const results = [];
            
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                
                const values = this.parseCSVLine(lines[i]);
                const obj = {};
                
                headers.forEach((header, idx) => {
                    if (idx < values.length && values[idx]) {
                        obj[header] = values[idx].trim().replace(/^"|"$/g, '');
                    }
                });
                
                if (Object.keys(obj).length > 0) {
                    results.push(obj);
                }
            }
            
            return results;
        }
        
        parseCSVLine(line) {
            const result = [];
            let inQuotes = false;
            let currentField = '';
            
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    result.push(currentField);
                    currentField = '';
                } else {
                    currentField += char;
                }
            }
            
            result.push(currentField);
            return result;
        }
        
        mapToForm(data) {
            console.log('Mapping data to form:', data);
            
            let mappedCount = 0;
            
            for (const [sourceField, value] of Object.entries(data)) {
                if (!value || value === '') continue;
                
                const normalizedField = sourceField.toLowerCase().replace(/[^a-z]/g, '');
                let targetField = null;
                
                // Find matching field
                for (const [key, target] of Object.entries(fieldMappings)) {
                    if (normalizedField.includes(key) || key.includes(normalizedField)) {
                        targetField = target;
                        break;
                    }
                }
                
                if (targetField) {
                    const targetElement = document.getElementById(targetField);
                    if (targetElement) {
                        this.setFieldValue(targetElement, value);
                        mappedCount++;
                        
                        // Highlight the field briefly
                        this.highlightField(targetElement);
                    }
                }
            }
            
            // Auto-calculate selling price if purchase price and markup are available
            this.autoCalculateSellingPrice();
            
            // Auto-select initial quantity type
            const qtyElement = document.getElementById('initialQuantity');
            const qtyTypeElement = document.getElementById('initialQuantityType');
            if (qtyElement && qtyElement.value && parseFloat(qtyElement.value) > 0) {
                if (qtyTypeElement) qtyTypeElement.value = 'display';
            }
            
            this.showNotification(`Mapped ${mappedCount} fields from imported data`, 'info');
        }
        
        setFieldValue(element, value) {
            if (element.type === 'number') {
                let numValue = parseFloat(value);
                if (isNaN(numValue)) {
                    // Try to extract number from string
                    const match = value.match(/(\d+(?:\.\d+)?)/);
                    if (match) numValue = parseFloat(match[0]);
                }
                element.value = isNaN(numValue) ? 0 : numValue;
            } 
            else if (element.type === 'date') {
                // Try to parse various date formats
                let date = new Date(value);
                if (!isNaN(date.getTime())) {
                    element.value = date.toISOString().split('T')[0];
                } else {
                    // Try DD/MM/YYYY format
                    const parts = value.split(/[/-]/);
                    if (parts.length === 3) {
                        date = new Date(parts[2], parts[1] - 1, parts[0]);
                        if (!isNaN(date.getTime())) {
                            element.value = date.toISOString().split('T')[0];
                        } else {
                            element.value = value;
                        }
                    } else {
                        element.value = value;
                    }
                }
            }
            else {
                element.value = value;
            }
            
            // Trigger change event
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        autoCalculateSellingPrice() {
            const purchasePrice = parseFloat(document.getElementById('purchasePricePerDisplay')?.value);
            const markup = parseFloat(document.getElementById('markup')?.value);
            const sellingPriceEl = document.getElementById('sellingPricePerDisplay');
            
            if (!isNaN(purchasePrice) && !isNaN(markup) && purchasePrice > 0 && sellingPriceEl) {
                const sellingPrice = purchasePrice * (1 + markup / 100);
                sellingPriceEl.value = sellingPrice.toFixed(2);
                sellingPriceEl.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
        
        highlightField(element) {
            const originalBorder = element.style.border;
            const originalBackground = element.style.background;
            
            element.style.border = '2px solid #00ff88';
            element.style.background = 'rgba(0, 255, 136, 0.1)';
            
            setTimeout(() => {
                element.style.border = originalBorder;
                element.style.background = originalBackground;
            }, 1000);
        }
        
        showNotification(message, type = 'info') {
            // Use existing toast system if available
            if (window.ultraStock && typeof window.ultraStock.showToast === 'function') {
                window.ultraStock.showToast(message, type);
            } else {
                // Fallback notification
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: ${type === 'success' ? '#00ff88' : type === 'warning' ? '#ffaa00' : '#ffd700'};
                    color: ${type === 'success' ? '#0a1f3d' : '#0a1f3d'};
                    padding: 12px 20px;
                    border-radius: 8px;
                    z-index: 100000;
                    font-weight: bold;
                    animation: slideIn 0.3s ease;
                `;
                notification.textContent = message;
                document.body.appendChild(notification);
                setTimeout(() => notification.remove(), 3000);
            }
        }
    }
    
    // ==================== INITIALIZATION ====================
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            window.importManager = new ImportManager();
        }, 1500);
    });
})();