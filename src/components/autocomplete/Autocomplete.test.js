import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Autocomplete, KEY_CODES, VISIBLE_ITEMS } from './Autocomplete';
import items from '../../fixtures/employeesFlattened';

describe('Autocomplete', () => {
    beforeEach(() => {
        window.HTMLElement.prototype.scroll = jest.fn();
    });

    afterEach(cleanup);

    test('matches snapshot', () => {
        const { asFragment } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Shows default placeholder', () => {
        const { getByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        expect(getByTestId('input')).toHaveAttribute('placeholder', 'Search...');
    });

    test('Shows given placeholder', () => {
        const { getByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} placeholder="Choose Manager" />);
        expect(getByTestId('input')).toHaveAttribute('placeholder', 'Choose Manager');
    });

    test('matches the snapshot with menu open', () => {
        const { asFragment, getByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        fireEvent.click(getByTestId('input'));
        expect(asFragment()).toMatchSnapshot();
    });

    test('matches the snapshot with query', () => {
        const { asFragment, getByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        fireEvent.change(getByTestId('input'), { target: { value: 'hm' } });

        expect(asFragment()).toMatchSnapshot();
    });

    test('filters items based on given query', () => {
        const { getByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        fireEvent.change(getByTestId('input'), { target: { value: 'hm' } });

        expect(getByTestId('items').childNodes).toHaveLength(2);
    });


    test('shows no suggestion when no item with given query found', () => {
        const { queryByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        fireEvent.change(queryByTestId('input'), { target: { value: 'xxxxxxxx' } });

        expect(queryByTestId('items')).toBe(null);
    });


    test('toggles the menu by clicking on the arrow button', () => {
        const { queryByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        fireEvent.click(queryByTestId('arrow'))
        expect(queryByTestId('items')).toBeInTheDocument();
        fireEvent.click(queryByTestId('arrow'))
        expect(queryByTestId('items')).toBe(null);
    });


    test('closes the menu when clilcked outside the input', () => {
        const { queryByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        fireEvent.click(queryByTestId('arrow'));
        expect(queryByTestId('items')).toBeInTheDocument();
        fireEvent.click(document);
        expect(queryByTestId('items')).toBe(null);
    });


    test('pressing arrow down will open the menu', () => {
        const { queryByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        fireEvent.keyDown(queryByTestId('input'), { keyCode: KEY_CODES.ARROW_DOWN });
        expect(queryByTestId('items')).toBeInTheDocument();
    });


    test('pressing arrow down 3 times will open the menu and set scroll', (done) => {
        jest.spyOn(window.HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(728);
        const { queryByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        fireEvent.keyDown(queryByTestId('input'), { keyCode: KEY_CODES.ARROW_DOWN });
        fireEvent.keyDown(queryByTestId('input'), { keyCode: KEY_CODES.ARROW_DOWN });
        fireEvent.keyDown(queryByTestId('input'), { keyCode: KEY_CODES.ARROW_DOWN });
        expect(queryByTestId('items')).toBeInTheDocument();
        setTimeout(() => {
            expect(window.HTMLElement.prototype.scroll).toHaveBeenCalledTimes(3 - VISIBLE_ITEMS);
            done();
        })
    });


    test('pressing arrow up will open the menu', () => {
        const { queryByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        fireEvent.keyDown(queryByTestId('input'), { keyCode: KEY_CODES.ARROW_UP });
        expect(queryByTestId('items')).toBeInTheDocument();
    });

    test('pressing arrow up 3 times will open the menu and set scroll', (done) => {
        jest.spyOn(window.HTMLElement.prototype, 'scrollTop', 'get').mockReturnValue(566);
        jest.spyOn(window.HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(728);
        const { queryByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        fireEvent.keyDown(queryByTestId('input'), { keyCode: KEY_CODES.ARROW_UP });
        fireEvent.keyDown(queryByTestId('input'), { keyCode: KEY_CODES.ARROW_UP });
        fireEvent.keyDown(queryByTestId('input'), { keyCode: KEY_CODES.ARROW_UP });
        expect(queryByTestId('items')).toBeInTheDocument();
        setTimeout(() => {
            expect(window.HTMLElement.prototype.scroll).toHaveBeenCalledTimes(3 - VISIBLE_ITEMS + 1);
            done();
        })
    });

    test('pressing Escape will close the menu', () => {
        const { queryByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        fireEvent.click(queryByTestId('arrow'));
        expect(queryByTestId('items')).toBeInTheDocument();
        fireEvent.keyDown(queryByTestId('input'), { keyCode: KEY_CODES.ESCAPE });
        expect(queryByTestId('items')).toBe(null);
    });


    test('pressing Tab will close the menu', () => {
        const { queryByTestId } = render(<Autocomplete items={items} onSelect={jest.fn()} />);
        fireEvent.click(queryByTestId('arrow'));
        expect(queryByTestId('items')).toBeInTheDocument();
        fireEvent.keyDown(queryByTestId('input'), { keyCode: KEY_CODES.TAB });
        expect(queryByTestId('items')).toBe(null);
    });


    test('navitgate to second item with keyboard and press Enter will fire onSelect callback and close the menu', () => {
        const onSelect = jest.fn();
        const { queryByTestId } = render(<Autocomplete items={items} onSelect={onSelect} />);
        fireEvent.keyDown(queryByTestId('input'), { keyCode: KEY_CODES.ARROW_DOWN });
        fireEvent.keyDown(queryByTestId('input'), { keyCode: KEY_CODES.ARROW_DOWN });
        expect(queryByTestId('items')).toBeInTheDocument();
        fireEvent.keyDown(queryByTestId('input'), { keyCode: KEY_CODES.ENTER });
        expect(onSelect).toHaveBeenCalledWith(items[1]);
        expect(queryByTestId('items')).toBe(null);
    });

    // More tests are required to fully test the feature, but because of the lack of time these sample tests are only written.
});