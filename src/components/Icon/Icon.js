import React from 'react';
import classNames from 'classnames';
import {ReactComponent as ArchiveFileIcon} from '../../assets/icons/archive.svg';
import {ReactComponent as SettingsIcon} from '../../assets/icons/gear.svg';
import {ReactComponent as TrashIcon} from '../../assets/icons/trash.svg';
import './Icon.css';


const icons = {
    file: ArchiveFileIcon,
    settings: SettingsIcon,
    trash: TrashIcon,
};
const Icon = ({name, className, ...props}) => {
    const SelectedIcon = icons[name];
    return (
        <SelectedIcon
            className={classNames('icon', className)}
            {...props}
        />
    );
};
export default Icon;
