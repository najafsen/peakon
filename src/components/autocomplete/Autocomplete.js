import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Autocomplete.scss';
import { Avatar } from '../avatar/Avatar';
import { createSearchRegex } from '../../lib/regex.lib';

export const KEY_CODES = {
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    ARROW_UP: 38,
    ARROW_DOWN: 40
}

export const Autocomplete = React.memo(({ items, onSelect, placeholder = 'Search...' }) => {
    const [visibleItems, setVisibleItems] = useState(items);
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(-1);
    const inputRef = useRef(null);
    const arrowRef = useRef(null);

    const selectItem = useCallback((item) => {
        setQuery(item.name);
        onSelect(item);
        inputRef.current.focus();
    }, [onSelect]);

    const handleDocumentClick = useCallback((e) => {
        if (
            inputRef.current &&
            arrowRef.current &&
            !inputRef.current.contains(e.target) &&
            !arrowRef.current.contains(e.target)
        ) {
            setIsOpen(false);
            setActiveItem(-1);
        }
    }, []);

    const handleInputKeyDown = useCallback((e) => {
        switch (e.keyCode) {
            case KEY_CODES.ENTER: {
                if (!isOpen) {
                    break;
                }
                setActiveItem(-1);
                setIsOpen(false);
                selectItem(visibleItems[activeItem]);
                break;
            }

            case KEY_CODES.TAB:
            case KEY_CODES.ESCAPE: {
                setActiveItem(-1);
                setIsOpen(false);
                break;
            }

            case KEY_CODES.ARROW_UP: {
                if (!isOpen) {
                    setIsOpen(true);
                }
                if (activeItem <= 0) {
                    setActiveItem(visibleItems.length - 1);
                } else {
                    setActiveItem(activeItem - 1);
                }
                break;
            }

            case KEY_CODES.ARROW_DOWN: {
                if (!isOpen) {
                    setIsOpen(true);
                }
                if (activeItem === visibleItems.length - 1) {
                    setActiveItem(0);
                } else {
                    setActiveItem(activeItem + 1);
                }
                break;
            }

            default: break;
        }
    }, [activeItem, isOpen, selectItem, visibleItems]);

    const handleInputChange = useCallback(e => {
        if (!isOpen) {
            setIsOpen(true);
        }

        setQuery(e.target.value);
    }, [isOpen]);

    const handleItemMouseOver = useCallback((i) => (e) => {
        setActiveItem(i);
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
    }, [handleDocumentClick]);

    useEffect(() => {
        const filteredItems = items.filter(item => createSearchRegex(query, 'i').test(item.name));
        setVisibleItems(filteredItems);
    }, [items, query]);

    return (
        <div className="autocomplete-component">

            <input
                data-testid="input"
                ref={inputRef}
                placeholder={placeholder}
                value={query}
                onClick={() => setIsOpen(true)}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
            />

            <i
                data-testid="arrow"
                ref={arrowRef}
                className={cx('arrow-down', { active: isOpen })}
                onClick={() => setIsOpen(!isOpen)}
            />

            {
                (isOpen && visibleItems.length) ? (
                    <ul data-testid="items" className="autocomplete-items">
                        {
                            visibleItems.map((item, index) => (
                                <li
                                    key={item.id}
                                    className={cx('autocomplete-item', { 'active': activeItem === index })}
                                    onClick={() => { selectItem(item) }}
                                    onMouseOver={handleItemMouseOver(index)}
                                >
                                    <div className="item-content">
                                        <div className="avatar">
                                            <Avatar src="item.avatar" name={item.name} />
                                        </div>
                                        <div className="info">
                                            <div className="name">{item.name}</div>
                                            <div className="email">{item.email}</div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                ) : null
            }

        </div>
    )
});

Autocomplete.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect: PropTypes.func,
    placeholder: PropTypes.string
}