import React from 'react';
import { render } from '@testing-library/react';
import { Managers } from './Managers';
import { MANAGERS_INITIAL_STATE } from '../../reducers/managers.reducer';
import { withRedux, withFetchMock } from '../../lib/test.lib';
import employeesFixture from '../../fixtures/employees';

const url = 'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';

describe('Managers', () => {
    test('matches snapshot', () => {
        const state = {
            managers: MANAGERS_INITIAL_STATE
        };
        const fetchMock = {
            matcher: url,
            response: employeesFixture,
            method: 'GET'
        }
        const { asFragment } = render(
            withRedux(
                withFetchMock(<Managers />, { options: fetchMock }),
                state
            )
        );

        expect(asFragment()).toMatchSnapshot();
    });
});