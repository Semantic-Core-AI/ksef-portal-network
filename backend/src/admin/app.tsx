import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['pl'], // Enable Polish locale
  },
  bootstrap(app: StrapiApp) {
    console.log('🎨 Strapi Admin Panel - Custom Paste Upload with Visual Tab Enabled');

    // Store files temporarily
    let pastedFiles: File[] = [];
    let isPasteTabActive = false;

    // Add global paste event listener for image uploads
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      // Find image in clipboard
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.type.indexOf('image') !== -1) {
          e.preventDefault();
          e.stopPropagation();

          const blob = item.getAsFile();
          if (!blob) continue;

          // Create a File object with timestamp name
          const timestamp = new Date().getTime();
          const extension = blob.type.split('/')[1] || 'png';
          const fileName = `pasted-image-${timestamp}.${extension}`;
          const file = new File([blob], fileName, { type: blob.type });

          console.log('📋 Pasted image detected:', fileName, blob.type);

          // Try multiple methods to add the file
          const uploadModal = document.querySelector('[role="dialog"]');

          // Method 1: Find file input
          const fileInput = (uploadModal || document).querySelector('input[type="file"]') as HTMLInputElement;

          if (fileInput) {
            try {
              // Create a new FileList-like object
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(file);

              // Set the files to the input
              fileInput.files = dataTransfer.files;

              // Trigger change event
              const changeEvent = new Event('change', { bubbles: true });
              fileInput.dispatchEvent(changeEvent);

              // Also trigger input event
              const inputEvent = new Event('input', { bubbles: true });
              fileInput.dispatchEvent(inputEvent);

              console.log('✅ File added via input method');
              showPasteNotification(fileName);
            } catch (err) {
              console.warn('⚠️ Input method failed:', err);

              // Method 2: Simulate drop event
              try {
                const dropzone = (uploadModal || document).querySelector('[data-strapi-dropzone], .dropzone, [class*="Dropzone"]');

                if (dropzone) {
                  const dt = new DataTransfer();
                  dt.items.add(file);

                  const dropEvent = new DragEvent('drop', {
                    bubbles: true,
                    dataTransfer: dt
                  });

                  dropzone.dispatchEvent(dropEvent);
                  console.log('✅ File added via drop method');
                  showPasteNotification(fileName);
                }
              } catch (dropErr) {
                console.warn('⚠️ Drop method also failed:', dropErr);
              }
            }
          } else {
            // Store file and show instruction
            pastedFiles.push(file);
            showPasteInstruction(fileName);
          }

          break;
        }
      }
    };

    // Show instruction when paste needs manual trigger
    const showPasteInstruction = (fileName: string) => {
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 80px;
          right: 20px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(240, 147, 251, 0.4);
          z-index: 10000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          font-size: 14px;
          font-weight: 500;
          animation: slideIn 0.3s ease-out;
        ">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">💡</span>
            <div>
              <div style="font-weight: 600; margin-bottom: 4px;">Image ready to paste!</div>
              <div style="font-size: 12px; opacity: 0.9;">${fileName}</div>
              <div style="font-size: 11px; opacity: 0.8; margin-top: 4px;">Click on dropzone and paste again (Ctrl+V)</div>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.firstElementChild!.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
          notification.remove();
        }, 300);
      }, 5000);
    };

    // Show notification when image is pasted
    const showPasteNotification = (fileName: string) => {
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 80px;
          right: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
          z-index: 10000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          font-size: 14px;
          font-weight: 500;
          animation: slideIn 0.3s ease-out;
        ">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">✅</span>
            <div>
              <div style="font-weight: 600; margin-bottom: 2px;">Image pasted successfully!</div>
              <div style="font-size: 12px; opacity: 0.9;">${fileName}</div>
            </div>
          </div>
        </div>
      `;

      // Add animation keyframes
      if (!document.getElementById('paste-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'paste-notification-styles';
        style.innerHTML = `
          @keyframes slideIn {
            from {
              transform: translateX(400px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideOut {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(400px);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      document.body.appendChild(notification);

      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.firstElementChild!.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
          notification.remove();
        }, 300);
      }, 3000);
    };

    // Function to aggressively trigger upload
    const triggerUpload = async (file: File, modal: Element) => {
      console.log('🚀 Triggering upload for:', file.name);

      // Method 1: Try to find and fill file input
      const fileInput = modal.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        try {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInput.files = dataTransfer.files;

          // Trigger all possible events
          fileInput.dispatchEvent(new Event('change', { bubbles: true }));
          fileInput.dispatchEvent(new Event('input', { bubbles: true }));
          fileInput.dispatchEvent(new Event('blur', { bubbles: true }));

          console.log('✅ Method 1: File input filled');
          showPasteNotification(file.name);
          return;
        } catch (err) {
          console.warn('⚠️ Method 1 failed:', err);
        }
      }

      // Method 2: Simulate drag and drop on dropzone
      const dropzoneSelectors = [
        '[data-strapi-dropzone]',
        '.dropzone',
        '[class*="Dropzone"]',
        '[class*="dropzone"]',
        '[role="tabpanel"][style*="display: flex"]'
      ];

      for (const selector of dropzoneSelectors) {
        const dropzone = modal.querySelector(selector);
        if (dropzone) {
          try {
            const dt = new DataTransfer();
            dt.items.add(file);

            // Try drop event
            const dropEvent = new DragEvent('drop', {
              bubbles: true,
              cancelable: true,
              dataTransfer: dt
            });

            dropzone.dispatchEvent(dropEvent);
            console.log('✅ Method 2: Drop event dispatched on', selector);
            showPasteNotification(file.name);
            return;
          } catch (err) {
            console.warn('⚠️ Method 2 failed on', selector, ':', err);
          }
        }
      }

      // Method 3: Try to find React fiber and trigger directly
      try {
        const reactFiberKey = Object.keys(modal).find(key => key.startsWith('__reactFiber'));
        if (reactFiberKey) {
          console.log('🔍 Found React Fiber, attempting direct manipulation');
          // This is advanced - try to trigger upload through React
        }
      } catch (err) {
        console.warn('⚠️ Method 3 failed:', err);
      }

      // If all methods fail, show instruction
      console.warn('⚠️ All upload methods failed');
      showPasteInstruction(file.name);
    };

    // Add paste event listener
    document.addEventListener('paste', handlePaste);

    // Function to add visual "FROM PASTE" tab
    const addPasteTab = () => {
      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return;

      // Check if tabs exist
      const tabList = modal.querySelector('[role="tablist"]');
      if (!tabList) return;

      // Check if paste tab already exists
      if (document.getElementById('paste-tab-custom')) return;

      console.log('🎨 Adding FROM PASTE tab...');

      // Create FROM PASTE tab button
      const pasteTab = document.createElement('button');
      pasteTab.id = 'paste-tab-custom';
      pasteTab.setAttribute('role', 'tab');
      pasteTab.setAttribute('aria-selected', 'false');
      pasteTab.setAttribute('aria-controls', 'paste-panel');
      pasteTab.setAttribute('tabindex', '-1');
      pasteTab.setAttribute('type', 'button');

      // Match Strapi's tab styling
      pasteTab.style.cssText = `
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        color: rgb(51, 65, 85);
        cursor: pointer;
        font-family: inherit;
        font-size: 14px;
        font-weight: 500;
        padding: 12px 16px;
        transition: all 0.2s;
        position: relative;
      `;

      pasteTab.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px;">📋</span>
          <span>FROM PASTE</span>
        </div>
      `;

      // Hover effect
      pasteTab.addEventListener('mouseenter', () => {
        if (pasteTab.getAttribute('aria-selected') !== 'true') {
          pasteTab.style.color = 'rgb(79, 70, 229)';
        }
      });

      pasteTab.addEventListener('mouseleave', () => {
        if (pasteTab.getAttribute('aria-selected') !== 'true') {
          pasteTab.style.color = 'rgb(51, 65, 85)';
        }
      });

      // Click handler
      pasteTab.addEventListener('click', () => {
        // Deactivate other tabs
        const allTabs = tabList.querySelectorAll('[role="tab"]');
        allTabs.forEach(tab => {
          tab.setAttribute('aria-selected', 'false');
          (tab as HTMLElement).style.borderBottomColor = 'transparent';
          (tab as HTMLElement).style.color = 'rgb(51, 65, 85)';
        });

        // Activate paste tab
        pasteTab.setAttribute('aria-selected', 'true');
        pasteTab.style.borderBottomColor = 'rgb(79, 70, 229)';
        pasteTab.style.color = 'rgb(79, 70, 229)';

        // Hide all panels
        const allPanels = modal.querySelectorAll('[role="tabpanel"]');
        allPanels.forEach(panel => {
          (panel as HTMLElement).style.display = 'none';
        });

        // Show/create paste panel
        showPastePanel();
      });

      // Add tab to tab list
      tabList.appendChild(pasteTab);

      console.log('✅ FROM PASTE tab added!');
    };

    // Function to show paste panel
    const showPastePanel = () => {
      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return;

      // Remove existing paste panel if any
      const existingPanel = document.getElementById('paste-panel-custom');
      if (existingPanel) {
        existingPanel.style.display = 'flex';
        return;
      }

      // Find tab panels container
      const firstPanel = modal.querySelector('[role="tabpanel"]');
      if (!firstPanel || !firstPanel.parentElement) return;

      const container = firstPanel.parentElement;

      // Create paste panel
      const pastePanel = document.createElement('div');
      pastePanel.id = 'paste-panel-custom';
      pastePanel.setAttribute('role', 'tabpanel');
      pastePanel.setAttribute('aria-labelledby', 'paste-tab');
      pastePanel.setAttribute('tabindex', '0'); // Make it focusable

      pastePanel.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 48px 24px;
        min-height: 400px;
        gap: 24px;
        outline: none;
      `;

      // Add dedicated paste handler for this panel
      pastePanel.addEventListener('paste', async (e: ClipboardEvent) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('🎯 Paste event in FROM PASTE panel!');

        const items = e.clipboardData?.items;
        if (!items) {
          console.warn('⚠️ No clipboard items');
          return;
        }

        // Find image in clipboard
        for (let i = 0; i < items.length; i++) {
          const item = items[i];

          if (item.type.indexOf('image') !== -1) {
            const blob = item.getAsFile();
            if (!blob) continue;

            // Create a File object with timestamp name
            const timestamp = new Date().getTime();
            const extension = blob.type.split('/')[1] || 'png';
            const fileName = `pasted-image-${timestamp}.${extension}`;
            const file = new File([blob], fileName, { type: blob.type });

            console.log('✅ Image pasted:', fileName, blob.type, 'Size:', blob.size);

            // Try to trigger upload
            await triggerUpload(file, modal);

            break;
          }
        }
      });

      // Auto-focus the panel when shown
      setTimeout(() => pastePanel.focus(), 100);

      pastePanel.innerHTML = `
        <div style="
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
        ">
          <span style="font-size: 64px;">📋</span>
        </div>

        <div style="text-align: center; max-width: 500px;">
          <h3 style="
            font-size: 24px;
            font-weight: 700;
            color: rgb(15, 23, 42);
            margin: 0 0 12px 0;
          ">Paste Image from Clipboard</h3>

          <p style="
            font-size: 15px;
            color: rgb(100, 116, 139);
            margin: 0 0 24px 0;
            line-height: 1.6;
          ">
            Copy an image to your clipboard, then click the button below to upload it
          </p>

          <button id="paste-button-custom" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 16px 48px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 12px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);
            transition: all 0.3s;
            margin-bottom: 16px;
          " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 14px rgba(102, 126, 234, 0.4)'">
            📋 Click to Paste from Clipboard
          </button>

          <div id="paste-status-custom" style="
            min-height: 24px;
            font-size: 14px;
            margin-bottom: 16px;
          "></div>

          <div style="
            background: rgb(241, 245, 249);
            border-radius: 12px;
            padding: 20px;
            text-align: left;
          ">
            <div style="font-weight: 600; margin-bottom: 12px; color: rgb(51, 65, 85);">
              ✨ How to use:
            </div>
            <ol style="
              margin: 0;
              padding-left: 20px;
              color: rgb(71, 85, 105);
              font-size: 14px;
              line-height: 1.8;
            ">
              <li>Take a screenshot or copy an image</li>
              <li>Come back to this tab</li>
              <li>Press <strong>Ctrl+V</strong> (or <strong>Cmd+V</strong> on Mac)</li>
              <li>Your image will be uploaded automatically! ✅</li>
            </ol>
          </div>

          <div style="
            margin-top: 20px;
            padding: 16px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            border-radius: 8px;
            font-size: 13px;
            color: rgb(79, 70, 229);
          ">
            💡 <strong>Tip:</strong> This works with screenshots, images from websites, Photoshop, Figma, and more!
          </div>

          <div style="
            margin-top: 16px;
            padding: 12px 20px;
            background: rgb(254, 243, 199);
            border-left: 4px solid rgb(251, 191, 36);
            border-radius: 6px;
            font-size: 12px;
            color: rgb(146, 64, 14);
            text-align: left;
          ">
            <strong>🔍 Debug:</strong> Make sure this panel is focused (click here first), then press Ctrl+V/Cmd+V. Check browser console (F12) for logs!
          </div>
        </div>
      `;

      container.appendChild(pastePanel);

      // Add click handler for the button
      setTimeout(() => {
        const pasteButton = document.getElementById('paste-button-custom');
        const statusDiv = document.getElementById('paste-status-custom');

        if (pasteButton && statusDiv) {
          pasteButton.addEventListener('click', async () => {
            console.log('🖱️ Paste button clicked!');
            statusDiv.innerHTML = '<span style="color: rgb(100, 116, 139);">⏳ Reading clipboard...</span>';

            try {
              // Try to read from clipboard using Clipboard API
              const clipboardItems = await navigator.clipboard.read();
              console.log('📋 Clipboard items:', clipboardItems.length);

              for (const clipboardItem of clipboardItems) {
                console.log('📦 Clipboard item types:', clipboardItem.types);

                // Log each type individually
                clipboardItem.types.forEach((t, index) => {
                  console.log(`  [${index}] Type: "${t}"`);
                });

                for (const type of clipboardItem.types) {
                  console.log('🔍 Checking type:', type, '| Starts with image/:', type.startsWith('image/'));

                  if (type.startsWith('image/')) {
                    console.log('🖼️ Found image type:', type);

                    const blob = await clipboardItem.getType(type);
                    console.log('✅ Got blob:', blob.size, 'bytes');

                    // Create file
                    const timestamp = new Date().getTime();
                    const extension = type.split('/')[1] || 'png';
                    const fileName = `pasted-image-${timestamp}.${extension}`;
                    const file = new File([blob], fileName, { type });

                    console.log('📁 Created file:', fileName);
                    statusDiv.innerHTML = `<span style="color: rgb(34, 197, 94);">✅ Found image: ${fileName}</span>`;

                    // Trigger upload
                    await triggerUpload(file, modal);

                    return;
                  }
                }
              }

              // No image found
              console.warn('⚠️ No image found in clipboard');
              statusDiv.innerHTML = '<span style="color: rgb(239, 68, 68);">❌ No image in clipboard. Copy an image first!</span>';

            } catch (error) {
              console.error('❌ Clipboard read error:', error);
              statusDiv.innerHTML = `<span style="color: rgb(239, 68, 68);">❌ Error: ${error.message}</span>`;
            }
          });

          console.log('✅ Paste button handler attached');
        }
      }, 100);
    };

    // Observe DOM for modal appearance
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const modal = document.querySelector('[role="dialog"]');
        if (modal && !document.getElementById('paste-tab-custom')) {
          // Wait a bit for modal to fully render
          setTimeout(() => addPasteTab(), 100);
        }
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    console.log('✅ Paste upload handler registered');
    console.log('✅ Visual FROM PASTE tab will appear in upload modals');
    console.log('💡 Tip: Click FROM PASTE tab or press Ctrl+V anywhere to paste images');
  },
};
