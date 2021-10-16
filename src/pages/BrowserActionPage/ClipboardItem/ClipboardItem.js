import React from 'react';
import classNames from 'classnames';
import {Icon} from '../../../components';
import './ClipboardItem.css';
import {replaceNewlineWithSymbol} from "../../../utils/formatters";


const ClipboardItem = ({
                           item,
                           index,
                           activeClipboardItemIndex,
                           setActiveItemIndex,
                       }) => (
    <div
        key={item}
        tabIndex={0}
        className={
            classNames(
                "clipboardItemContainer",
                {'activeClipboardItem': activeClipboardItemIndex === index}
            )
        }
        onClick={() => setActiveItemIndex(index)}
        onDoubleClick={() => setActiveItemIndex(index, true)}
    >
        <Icon name="file" className="clipboardIcon"/>
        <span className="lineNumber">{index + 1}</span>
        <span className="clipboardTextContainer">
            {replaceNewlineWithSymbol(item)}
        </span>
    </div>
);

export default ClipboardItem;
