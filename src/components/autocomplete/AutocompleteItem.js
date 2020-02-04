import React from 'react';
import cx from 'classnames';
import { Avatar } from '../avatar/Avatar';

export const AutocompleteItem = ({ item, isActive, onSelect, onMouseOver }) => {
    return (
        <li
            data-testid="li"
            className={cx('autocomplete-item', { 'active': isActive })}
            onClick={() => onSelect(item)}
            onMouseOver={() => onMouseOver(item)}
        >
            <div className="item-content">
                <div className="avatar">
                    <Avatar src={item.avatar} name={item.name} />
                </div>
                <div className="info">
                    <div className="name">{item.name}</div>
                    <div className="email">{item.email}</div>
                </div>
            </div>
        </li>
    );
}