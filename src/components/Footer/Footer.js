import React from 'react';
import classNames from 'classnames';
import './Footer.css';

const Footer = ({children, className, ...props}) => (
    <div className={classNames("footer", className)} {...props}>
        {children}
    </div>
);

Footer.defaultProps = {
    children: null,
    className: '',
};

export default Footer;
