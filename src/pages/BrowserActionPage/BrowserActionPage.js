/*global chrome*/

import React from 'react';
import './BrowserActionPage.css';
import BrowserActionFooter from "./BrowserActionFooter/BrowserActionFooter";
import ClipboardContentArea from "./ClipboardContentArea/ClipboardContentArea";
import ClipboardItemList from "./ClipboardItemList/ClipboardItemList";
import BrowserActionBody from "./BrowserActionBody/BrowserActionBody";

class BrowserActionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clipboardItemsList: [],
            clipboardInitialItemsAdded: false,
            activeClipboardItemIndex: 0,
            showSettings: false,
        };
        this.getClipboardItems(true);
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            const {type, clipboardItemsList} = request;
            switch (type) {
                case 'clipboardUpdated':
                case 'valueAddedToClipboard':
                    this.setItemsList(clipboardItemsList);
                    break;
                default:
                    break;
            }
            return true;
        });
    }

    openSettingsPage = () => {
        chrome.runtime.openOptionsPage();
    };

    clearClipboard = () => {
        chrome.runtime.sendMessage({
            type: 'clearClipboard',
        }, function () {
            return true;
        });
    };

    setActiveItemIndex = (activeClipboardItemIndex, select = false) => {
        this.setState({activeClipboardItemIndex}, () => {
            select && this.selectActiveItem();
        });
    };

    closePopup = () => {
        window.close();
    };

    selectActiveItem = () => {
        const {activeClipboardItemIndex, clipboardItemsList} = this.state;
        this.selectItem(clipboardItemsList[activeClipboardItemIndex]);
    };

    handleKeyDown = (e) => {
        const {activeClipboardItemIndex, clipboardItemsList} = this.state;
        // arrow up/down button should select next/previous list element
        if (e.keyCode === 38 && activeClipboardItemIndex >= 0) {
            this.setActiveItemIndex(((activeClipboardItemIndex === 0) && clipboardItemsList.length - 1) || activeClipboardItemIndex - 1);
        } else if (e.keyCode === 40) {
            this.setActiveItemIndex((activeClipboardItemIndex + 1) % clipboardItemsList.length);
        } else if (e.keyCode === 13 && activeClipboardItemIndex >= 0 && activeClipboardItemIndex < clipboardItemsList.length) {
            this.selectActiveItem();
        } else if (e.keyCode === 27) {
            this.closePopup();
        }
    };

    setItemsList = (clipboardItemsList, initialAdd = false) => this.setState({
        clipboardItemsList,
        clipboardInitialItemsAdded: initialAdd ? true : this.state.clipboardInitialItemsAdded,
    });

    selectItem = item => {
        // copies the selected text to clipboard
        navigator.clipboard
            .writeText(item)
            .then(() => {
                console.log('Text copied to clipboard');
                // When sending message to content script, we need the exact tab to which the message needs to be sent.
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: 'pasteValueToContentPage',
                        value: '',
                    }, function (response) {
                        console.log('pasteValueToContentPage sent');
                        return true;
                    });
                });
                chrome.runtime.sendMessage({
                    type: 'addCopiedValue',
                    value: item,
                }, (response) => {
                    const {addedValue, clipboardItemsList} = response;
                    console.log('value added: ', addedValue);
                    console.log('new clipboard: ', clipboardItemsList);
                    // this.setItemsList(clipboardItemsList);
                    this.closePopup();
                    return true;
                });
            })
            .catch(err => {
                // This can happen if the user denies clipboard permissions:
                console.error('Could not copy text: ', err);
            });
    };

    getClipboardItems = (initialAdd) => {
        const {setItemsList} = this;
        chrome.storage.local.get(['clipboardItemsList'], (result) => {
            const {clipboardItemsList = []} = result;
            setItemsList(clipboardItemsList, initialAdd);
            console.log('Value got ', clipboardItemsList);
            console.log('initialAdd in getClipboardItems', initialAdd);
        });
    };

    getBodyRef = (ref) => {
        this.bodyRef = ref;
    };

    componentDidMount() {
        this.bodyRef.focus();
    }


    render() {
        const {clipboardItemsList, activeClipboardItemIndex} = this.state;
        const buttonListData = [
            {
                onClick: this.closePopup,
                children: 'Cancel',
            }, {
                defaultButton: true,
                onClick: this.selectActiveItem,
                children: 'Paste',
            }
        ];

        const clipboardContent = clipboardItemsList[activeClipboardItemIndex];

        return (
            <>
                <BrowserActionBody
                    getBodyRef={this.getBodyRef}
                    handleKeyDown={this.handleKeyDown}
                >
                    <ClipboardItemList
                        clipboardItemsList={clipboardItemsList}
                        activeClipboardItemIndex={activeClipboardItemIndex}
                        setActiveItemIndex={this.setActiveItemIndex}
                    />
                    <ClipboardContentArea value={clipboardContent}/>
                </BrowserActionBody>
                <BrowserActionFooter
                    clearClipboard={this.clearClipboard}
                    openSettingsPage={this.openSettingsPage}
                    buttonListData={buttonListData}
                />
            </>
        );
    }
}

export default BrowserActionPage;
