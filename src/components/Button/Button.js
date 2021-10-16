import React from 'react';
import classNames from 'classnames';
import './Button.css';

const Button = ({defaultButton, classes, children, className, disabled, ...props}) => (
    <button
        className={classNames("button", className, {
            'defaultButton': defaultButton,
            'disabled': disabled,
            [classes.defaultButton]: defaultButton,
            [classes.disabled]: disabled,
        })}
        {...props}
    >
        {children}
    </button>
);

Button.defaultProps = {
    defaultButton: false,
    classes: {

    },
    children: '',
    className: '',
};

export default Button;
