import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AutocompleteItem } from './AutocompleteItem';

describe('AutocompleteItem', () => {
    let item, isActive, onSelect, onMouseOver;

    beforeEach(() => {
        item = {
            name: 'The Name',
            email: 'the@email',
            avatar: 'the/src',
        };
        onSelect = jest.fn();
        onMouseOver = jest.fn();
        isActive = false;
    });

    test('default matches snapshot', () => {
        const { asFragment } = render(<AutocompleteItem item={item} isActive={isActive} onSelect={onSelect} onMouseOver={onMouseOver} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('active matches snapshot', () => {
        const { asFragment } = render(<AutocompleteItem item={item} isActive={true} onSelect={onSelect} onMouseOver={onMouseOver} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('default does not have active class', () => {
        const { getByTestId } = render(<AutocompleteItem item={item} isActive={isActive} onSelect={onSelect} onMouseOver={onMouseOver} />);
        expect(getByTestId('li')).not.toHaveClass('active');
    });

    test('active has active class', () => {
        const { getByTestId } = render(<AutocompleteItem item={item} isActive={true} onSelect={onSelect} onMouseOver={onMouseOver} />);
        expect(getByTestId('li')).toHaveClass('active');
    });

    test('onSelect event', () => {
        const { getByTestId } = render(<AutocompleteItem item={item} isActive={true} onSelect={onSelect} onMouseOver={onMouseOver} />);
        fireEvent.click(getByTestId('li'));
        expect(onSelect).toHaveBeenCalledWith(item);
    });

    test('onMouseOver event', () => {
        const { getByTestId } = render(<AutocompleteItem item={item} isActive={true} onSelect={onSelect} onMouseOver={onMouseOver} />);
        fireEvent.mouseOver(getByTestId('li'));
        expect(onMouseOver).toHaveBeenCalledWith(item);
    });

    // More tests should be added, because of lack of time I wrote only these sample tests
});