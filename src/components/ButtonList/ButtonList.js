import React from 'react';
import classNames from 'classnames';
import Button from "../Button/Button";
import './ButtonList.css';

const ButtonList = ({data, className, children, ...props}) => (
    <div
        className={classNames("buttonList", className)}
        {...props}
    >
        {data.map(item => <Button {...item} key={item.children} />)}
        {children}
    </div>
);

ButtonList.defaultProps = {
    className: [],
    data: [],
    children: null,
};

export default ButtonList;
