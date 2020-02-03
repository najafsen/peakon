import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {

    test('match snapshot initial state', () => {
        const { asFragment } = render(<Avatar name="Mohsen Najaflou" src="some/src" />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('initial state should only show correct alt text', () => {
        const { queryByTestId } = render(<Avatar name="Mohsen Najaflou" src="some/src" />);
        expect(queryByTestId('alt')).not.toHaveClass('hidden');
        expect(queryByTestId('alt')).toHaveTextContent('MN');
        expect(queryByTestId('image')).toHaveClass('hidden');
    });


    test('initial state should only show correct alt text with single word name', () => {
        const { queryByTestId } = render(<Avatar name="Mohsen" src="some/src" />);
        expect(queryByTestId('alt')).not.toHaveClass('hidden');
        expect(queryByTestId('alt')).toHaveTextContent('M');
        expect(queryByTestId('image')).toHaveClass('hidden');
    });


    test('initial state should only show "n/a" alt text with no name', () => {
        const { queryByTestId } = render(<Avatar name="" src="some/src" />);
        expect(queryByTestId('alt')).not.toHaveClass('hidden');
        expect(queryByTestId('alt')).toHaveTextContent('n/a');
        expect(queryByTestId('image')).toHaveClass('hidden');
    });


    test('matches snapshot when image is loaded', () => {
        const { asFragment, queryByTestId } = render(<Avatar name="Mohsen Najaflou" src="some/src" />);
        fireEvent.load(queryByTestId('image'));

        expect(asFragment()).toMatchSnapshot();
    });

    test('image loaded state should only show the image', () => {
        const { queryByTestId } = render(<Avatar name="Mohsen Najaflou" src="some/src" />);
        fireEvent.load(queryByTestId('image'));

        expect(queryByTestId('alt')).toHaveClass('hidden');
        expect(queryByTestId('alt')).toHaveTextContent('MN');
        expect(queryByTestId('image')).not.toHaveClass('hidden');
    });
});