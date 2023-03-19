import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUsedNavigate,
}));

it('Should show the corresponding key shortcut when user interacts with the input', () => {
	render(<SearchBar></SearchBar>);
	const searchInput = screen.getByPlaceholderText('Search games');

	expect(screen.getByText('Ctrl + k')).toBeInTheDocument();
	expect(screen.queryByText('Enter')).not.toBeInTheDocument();

	userEvent.click(searchInput);
	expect(screen.queryByText('Ctrl + k')).not.toBeInTheDocument();
	expect(screen.getByText('Enter')).toBeInTheDocument();
});

it('Should show search results dropdown on input', () => {
	render(<SearchBar></SearchBar>);
	const searchInput = screen.getByPlaceholderText('Search games');
	expect(screen.queryByTestId('search-dropdown')).not.toBeInTheDocument();

	userEvent.type(searchInput, 'testing');

	expect(screen.getByTestId('search-dropdown')).toBeInTheDocument();
});
