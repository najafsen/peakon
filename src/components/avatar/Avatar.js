import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Avatar.scss';

const getInitials = (name) => {
    const nameParts = name.split(' ');

    switch (nameParts.length) {
        case 0: return 'n/a';
        case 1: return nameParts[0][0].toUpperCase();
        default: return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    }
}

export const Avatar = memo(({ src, name }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="avatar-component">
            <div className={cx('avatar-alt', { 'hidden': isLoaded })}>{getInitials(name)}</div>
            <img className={cx('avatar-image', { 'hidden': !isLoaded })} src={src} alt={name} onLoad={() => setIsLoaded(true)} />
        </div>
    );
});

Avatar.propTypes = {
    name: PropTypes.string,
    src: PropTypes.string,
};