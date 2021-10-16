/*global chrome*/

import {DEFAULT_CLIPBOARD_ITEMS_LIMIT, DEFAULT_CLIPBOARD_ITEMS_LIST, DEFAULT_SETTINGS} from "../constants";

export const saveSettings = (nextSettings, merge = false, cb = f => f) => {
    chrome.storage.local.get(['settings', 'clipboardItemsList'], function (result) {
        const {clipboardItemsList: prevClipboardItemsList = [], settings: prevSettings = {}} = result;
        const settings = merge ? {...prevSettings, ...nextSettings} : nextSettings;
        const updateObj = {
            settings,
        };
        const clipboardLength = prevClipboardItemsList.length;
        let clipboardTruncated = false;
        if (settings.clipboardItemsLimit < clipboardLength) {
            clipboardTruncated = true;
            updateObj.clipboardItemsList = prevClipboardItemsList.slice(0, settings.clipboardItemsLimit)
        }
        chrome.storage.local.set(updateObj, () => {
            console.log('settings updated: ', settings);
            clipboardTruncated && console.log('clipboardTruncated truncated: ', updateObj.clipboardItemsList);
            cb({
                settings,
                clipboardTruncated,
                clipboardItemsList: updateObj.clipboardItemsList || prevClipboardItemsList,
            });
        });
    });
};

export const setClipboardItems = (items, cb = f => f) => {
    chrome.storage.local.set({clipboardItemsList: items}, function () {
        cb(items);
        console.log('clipboardItemsList set to ', items);
    });
};


export const initializeStorage = () => setClipboardItems(DEFAULT_CLIPBOARD_ITEMS_LIST, () => saveSettings(DEFAULT_SETTINGS));

// Function to add a value to clipboard in the order of last access
export const addValueToClipboard = (value, cb) => {
    chrome.storage.local.get(['clipboardItemsLimit', 'clipboardItemsList'], function (result) {
        const {
            clipboardItemsList = DEFAULT_CLIPBOARD_ITEMS_LIST,
            clipboardItemsLimit = DEFAULT_CLIPBOARD_ITEMS_LIMIT,
        } = result;
        console.log('Value received: ', clipboardItemsList);
        const newClipboardItemsList = [
            value,
            ...clipboardItemsList.filter(item => item !== value)
        ].slice(0, clipboardItemsLimit);
        setClipboardItems(newClipboardItemsList, (items) => cb({addedValue: value, clipboardItemsList: items}));
    });
};

// Function to clear clipboard items
export const clearClipboardItems = (cb) => {
    setClipboardItems([], (items) => cb({ clipboardItemsList: items}));
};
