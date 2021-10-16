import React from 'react';
import {Header} from '../../../components';
import ClipboardItem from "../ClipboardItem/ClipboardItem";
import './ClipboardItemList.css';

const ClipboardItemList = ({clipboardItemsList, activeClipboardItemIndex, setActiveItemIndex}) => (
    <div className="clipboardItems">
        <Header>Choose content to paste</Header>
        <div className="clipboardItemsList">
            {
                !clipboardItemsList.length &&
                <div className="emptyListMessage">--- Clipboard empty ---</div>
            }
            {
                clipboardItemsList.map((item, index) => (
                    <ClipboardItem
                        key={item}
                        item={item}
                        index={index}
                        activeClipboardItemIndex={activeClipboardItemIndex}
                        setActiveItemIndex={setActiveItemIndex}
                    />
                ))
            }
        </div>
    </div>
);

ClipboardItemList.defaultProps = {
    clipboardItemsList: [],
    activeClipboardItemIndex: 0,
    setActiveItemIndex: f => f,
};

export default ClipboardItemList;
