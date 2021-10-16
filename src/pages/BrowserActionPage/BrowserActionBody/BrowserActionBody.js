import React from 'react';
import './BrowserActionBody.css';

const BrowserActionBody = ({children, getBodyRef, handleKeyDown}) => (
    <div
        ref={getBodyRef}
        className="browserActionBody"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
    >
        {children}
    </div>
);

export default BrowserActionBody;
