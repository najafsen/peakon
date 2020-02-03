import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getNameInitials } from '../../lib/string.lib';
import './Avatar.scss';

export const Avatar = memo(({ src, name }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="avatar-component">
            <div data-testid="alt" className={cx('avatar-alt', { 'hidden': isLoaded })}>{getNameInitials(name)}</div>
            <img data-testid="image" className={cx('avatar-image', { 'hidden': !isLoaded })} src={src} alt={name} onLoad={() => setIsLoaded(true)} />
        </div>
    );
});

Avatar.propTypes = {
    name: PropTypes.string,
    src: PropTypes.string,
};