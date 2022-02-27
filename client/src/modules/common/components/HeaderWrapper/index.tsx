import React from 'react';
import styles from './HeaderWrapper.module.scss';
import Icon from './Icon';
interface IAppHeaderProps {
    children: React.ReactChild;
    style?: React.CSSProperties;
    height?: number;
    className?: string;
}

const HeaderWrapper: React.FC<IAppHeaderProps> = ({ children, style, height, className = '' }) => {
    return (
        <div
            style={{ ...style, minHeight: `${height}px`, zIndex: 99999999 }}
            className={`${styles.header_wraper} ${className} bg-cm-purple-700 `}
        >
            {children}
        </div>
    );
};

export default Object.assign(HeaderWrapper, { Icon });
