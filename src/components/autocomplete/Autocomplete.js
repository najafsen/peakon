import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Autocomplete.scss';
import { Avatar } from '../avatar/Avatar';
import { createSearchRegex } from '../../lib/regex.lib';

const VISIBLE_ITEMS = 2;

export const KEY_CODES = {
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    ARROW_UP: 38,
    ARROW_DOWN: 40
}

export const Autocomplete = React.memo(({ items, onSelect, placeholder = 'Search...' }) => {
    const [filteredItems, setFilteredItems] = useState(items);
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(-1);
    const inputRef = useRef(null);
    const arrowRef = useRef(null);
    const menuRef = useRef(null);

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

    const scrollToItem = useCallback((item) => {
        if (!menuRef.current) {
            return;
        }

        menuRef.current.scroll({
            top: ((VISIBLE_ITEMS - 1) * (menuRef.current.scrollHeight / filteredItems.length)) * (item),
            behavior: 'smooth'
        });
    }, [filteredItems.length]);

    const handleInputKeyDown = useCallback((e) => {
        let newActiveItem = activeItem;

        switch (e.keyCode) {
            case KEY_CODES.ENTER: {
                if (!isOpen) {
                    break;
                }
                setActiveItem(-1);
                setIsOpen(false);
                selectItem(filteredItems[activeItem]);
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
                newActiveItem = activeItem <= 0 ? filteredItems.length - 1 : activeItem - 1;
                setActiveItem(newActiveItem);
                setTimeout(() => scrollToItem(newActiveItem));
                break;
            }

            case KEY_CODES.ARROW_DOWN: {
                if (!isOpen) {
                    setIsOpen(true);
                }
                newActiveItem = activeItem === filteredItems.length - 1 ? 0 : activeItem + 1;
                setActiveItem(newActiveItem);
                setTimeout(() => scrollToItem(newActiveItem - 1));
                break;
            }

            default: break;
        }
    }, [activeItem, isOpen, selectItem, filteredItems, scrollToItem]);

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
        setFilteredItems(filteredItems);
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
                (isOpen && filteredItems.length) ? (
                    <ul
                        data-testid="items"
                        ref={menuRef}
                        className="autocomplete-items"
                    >
                        {
                            filteredItems.map((item, index) => (
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