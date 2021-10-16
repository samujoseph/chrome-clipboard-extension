import {addValueToClipboard, clearClipboardItems, initializeStorage, saveSettings} from "../utils/data.utils";

// when extension is installed
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        initializeStorage();
    }
});

// Event listener for `add value` instruction from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received in background script: ', {request, sender});
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    const {type, value} = request;
    switch (type) {
        case 'addValueToClipboard':
            addValueToClipboard(value, ({addedValue, clipboardItemsList}) => {
                sendResponse({addedValue, clipboardItemsList});
                // Broadcast addition of a new item in clipboard.
                chrome.runtime.sendMessage({
                    type: 'valueAddedToClipboard',
                    value: addedValue,
                    clipboardItemsList,
                });
            });
            break;
        case 'clearClipboard':
            clearClipboardItems(({clipboardItemsList}) => {
                sendResponse({clipboardItemsList});
                // Broadcast clipboard items update
                chrome.runtime.sendMessage({
                    type: 'clipboardUpdated',
                    clipboardItemsList,
                }, function () {
                    return true;
                });
            });
            break;
        case 'saveSettings':
            const {settings, merge} = request;
            saveSettings(settings, merge, ({
               settings,
               clipboardTruncated,
               clipboardItemsList
            }) => {
                // Broadcast addition of a new item in clipboard.
                chrome.runtime.sendMessage({
                    type: 'settingsSaved',
                    settings,
                    clipboardTruncated,
                    clipboardItemsList,
                }, function (response) {
                    return true;
                });

                // Broadcast update of clipboard
                if (clipboardTruncated) {
                    chrome.runtime.sendMessage({
                        type: 'clipboardUpdated',
                        clipboardItemsList,
                    }, function (response) {
                        return true;
                    });
                }
            });
            break;
        default:
            break;
    }
    return true;
});
