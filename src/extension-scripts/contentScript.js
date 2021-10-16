/*global chrome*/

console.log('content script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // If sender.tab, from a content script else from the extension background script;
    if (!sender.tab) {
        const {type} = request;
        switch (type) {
            case 'pasteValueToContentPage':
                document.execCommand("Paste", null, null);
                break;
            default:
                break;
        }
    }
    return true;
});

const copyHandler = (event) => {
    console.log('copy event fired');
    const selection = document.getSelection();
    const copiedValue = selection.toString();
    if (copiedValue !== '') {
        chrome.runtime.sendMessage({
            type: 'addValueToClipboard',
            value: copiedValue,
        }, function (response) {
            const {addedValue, clipboardItemsList} = response;
            console.log('value added: ', addedValue);
            console.log('new clipboard: ', clipboardItemsList);
            return true;
        });
    }
};

document.addEventListener('copy', copyHandler);
document.addEventListener('cut', copyHandler);
