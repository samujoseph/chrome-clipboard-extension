/*global chrome*/

import React from 'react';
import {fromJS} from 'immutable';
import Header from "../../components/Header/Header";
import './OptionsPage.css';
import Footer from "../../components/Footer/Footer";
import {ButtonList} from "../../components";
import {
    DEFAULT_SETTINGS,
    MAX_CLIPBOARD_ITEM_COUNT,
    MIN_CLIPBOARD_ITEM_COUNT,
    THEMES, DEFAULT_CLIPBOARD_ITEMS_LIST,
} from "../../constants";

const defaultStorageValues = fromJS({
    clipboardItemsList: DEFAULT_CLIPBOARD_ITEMS_LIST,
    settings: DEFAULT_SETTINGS,
});

export class OptionsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prev: defaultStorageValues,
            diff: defaultStorageValues,
        };

        chrome.storage.local.get([
            'clipboardItemsList',
            'settings',
        ], (result) => {
            const {
                clipboardItemsList = DEFAULT_CLIPBOARD_ITEMS_LIST,
                settings = DEFAULT_SETTINGS,
            } = result;
            const storageValues = fromJS({
                clipboardItemsList,
                settings,
            });
            this.setState({
                prev: storageValues,
                diff: storageValues,
            }, () => console.log('Options page state initialized from storage: ', this.state));
        });

        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log('a message received in OptionsPage');
            const { type, clipboardItemsList, settings } = request;
            switch (type) {
                case 'settingsSaved':
                    const storageValues = fromJS({
                        clipboardItemsList,
                        settings,
                    });
                    this.setState({
                        prev: storageValues,
                        diff: storageValues,
                    });
                    break;
                default:
                    break;
            }
            return true;
        });
    }

    hasSettingsChanged = () => {
        const {prev, diff} = this.state;
        return (
            (prev.getIn(['settings', 'theme']) !== diff.getIn(['settings', 'theme']))
            || (prev.getIn(['settings', 'clipboardItemsLimit']) !== diff.getIn(['settings', 'clipboardItemsLimit']))
            || (prev.getIn(['settings', 'incognitoClipboardEnabled']) !== diff.getIn(['settings', 'incognitoClipboardEnabled']))
        );
    };

    shouldTruncateClipboard = () => {
        const {prev, diff} = this.state;
        return prev.getIn(['settings', 'clipboardItemsLimit']) !== diff.getIn(['settings', 'clipboardItemsLimit'])
            && diff.getIn(['settings', 'clipboardItemsLimit']) < prev.get('clipboardItemsList').count();
    };

    onSettingsChange = (key, value) => {
        this.setState({
            diff: this.state.diff.setIn(['settings', key], value),
        })
    };

    saveSettings = () => {
        chrome.runtime.sendMessage({
            type: 'saveSettings',
            settings: this.state.diff.get('settings').toJS(),
            merge: true,
        }, function (response) {
            return true;
        });
    };

    render() {
        const {
            prev,
            diff,
        } = this.state;

        const leftButtonListData = [
            {
                onClick: () => window.close(),
                children: 'Reset to default',
            },
        ];
        const buttonListData = [
            {
                onClick: () => window.close(),
                children: 'Cancel',
            }, {
                defaultButton: true,
                onClick: this.saveSettings,
                children: 'Save Configuration',
                disabled: !this.hasSettingsChanged(),
            }
        ];
        return (
            <div className="optionsWrapper">
                <div className="optionBody">
                    <Header>Clipboard Options</Header>
                    <div className="optionsContent">
                        <div className="form">
                            <div>
                                <div>
                                    <label>Limit:</label>
                                    <input
                                        onChange={(e) => this.onSettingsChange('clipboardItemsLimit', e.target.value)}
                                        value={diff.getIn(['settings', 'clipboardItemsLimit'])}
                                        className="textField"
                                        type="number"
                                        min={MIN_CLIPBOARD_ITEM_COUNT}
                                        max={MAX_CLIPBOARD_ITEM_COUNT}
                                    />
                                    <span>items (Min.1, Max.100)</span>
                                </div>
                                {this.shouldTruncateClipboard() && (
                                    <div className="validationMessage warning">
                                        <span>Warning: You currently have <span className="emphasizedCount"> {prev.get('clipboardItemsList').count()} </span> items on your clipboard.
                                        Only the first {diff.getIn(['settings', 'clipboardItemsLimit'])} items will be retained. The rest will be cleared from clipboard once you save the settings.
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label>Theme:</label>
                                <select
                                    className="selectDropdown"
                                    value={diff.getIn(['settings', 'theme'])}
                                    onChange={(e) => this.onSettingsChange('theme', e.target.value)}
                                >
                                    {
                                        THEMES
                                            .map(({value, name}) => (
                                                <option
                                                    key={value}
                                                    value={value}
                                                >
                                                    {name}
                                                </option>)
                                            )
                                    }
                                </select>
                            </div>
                            <div>
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    checked={diff.getIn(['settings', 'incognitoClipboardEnabled'])}
                                    onChange={(e) => this.onSettingsChange('incognitoClipboardEnabled', e.target.checked)}
                                />
                                <label>Enable clipboard for Incognito tabs</label>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer className="optionsFooter">
                    <ButtonList data={leftButtonListData}/>
                    <ButtonList data={buttonListData}/>
                </Footer>
            </div>
        );
    }
};

export default OptionsPage;
