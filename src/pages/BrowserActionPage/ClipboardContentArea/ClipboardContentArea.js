import React from 'react';
import './ClipboardContentArea.css';

const ClipboardContentArea = ({ value }) => (
    <div className="clipboardContentArea">
        {value}
    </div>
);

ClipboardContentArea.defaultProps = {
    value: ''
};

export default ClipboardContentArea;
