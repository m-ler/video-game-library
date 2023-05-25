import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store';
import NavMenuButton from './NavMenuButton';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

it('Should dispatch a "toggleNavMenu" on button click', () => {
	render(
		<Provider store={store}>
			<NavMenuButton />
		</Provider>
	);
	const button = screen.getByRole('button');
	userEvent.click(button);
	expect(mockDispatch).toBeCalledTimes(1);
	expect(mockDispatch).toHaveBeenLastCalledWith({ type: 'navMenu/toggleNavMenu', payload: expect.any(Boolean) });
});
