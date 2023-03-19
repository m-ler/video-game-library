import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeButton from './ThemeButton';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

it('Should dispatch a "toggleToggle" action on button click', () => {
	render(
		<Provider store={store}>
			<ThemeButton />
		</Provider>
	);
	const button = screen.getByRole('button');
	userEvent.click(button);
	expect(mockDispatch).toBeCalledTimes(1);
	expect(mockDispatch).toHaveBeenLastCalledWith({ type: 'theme/toggleTheme', payload: expect.any(String) });
});
