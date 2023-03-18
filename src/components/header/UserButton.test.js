import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserButton from './UserButton';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

it('Should navigate to login page on button click', () => {
	render(<UserButton />);
	userEvent.click(screen.getByRole('button'));
	expect(mockUseNavigate).toBeCalledTimes(1);
});
