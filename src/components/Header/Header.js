import React from 'react';
import classNames from 'classnames';
import './Header.css';

const Header = ({ children, className, ...props }) => (
    <div
        className={classNames("clipboardHeader", className)}
        {...props}
    >
        {children}
    </div>
);

export default Header;
