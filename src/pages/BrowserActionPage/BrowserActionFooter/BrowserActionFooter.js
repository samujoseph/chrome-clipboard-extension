import React from 'react';
import {Icon, ButtonList, Footer} from '../../../components';
import './BrowserActionFooter.css';

const BrowserActionFooter = ({clearClipboard, openSettingsPage, buttonListData}) => (
    <Footer>
        <div className="footerActionItems">
            <Icon
                name="settings"
                title="Open settings"
                className="footerIcon"
                onClick={openSettingsPage}
            />
            <Icon
                name="trash"
                title="Clear clipboard"
                className="footerIcon"
                onClick={clearClipboard}
            />
        </div>
        <ButtonList data={buttonListData}/>
    </Footer>
);

export default BrowserActionFooter;
