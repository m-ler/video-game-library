import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import FormInput from './FormInput';

it('Should apply props correctly', () => {
	const id = 'input-test';
	const type = 'text';
	const label = 'input-label';

	render(<FormInput id={id} type={label} label={label} icon={<></>} />);
	const input = screen.getByRole('textbox');
	const labelElement = screen.getByTestId('form-input-label');

	expect(input.id).toBe(id);
	expect(input.type).toBe(type);
	expect(labelElement.innerHTML).toBe(label);
});

it('Should run validation function', () => {
	const validationFunction = jest.fn();
	render(<FormInput id="test" type="string" label="Testing" icon={<></>} validate={validationFunction} />);
	const input = screen.getByRole('textbox');

	userEvent.type(input, 'testing');
	fireEvent.blur(input);

	expect(validationFunction).toHaveBeenCalled();
});

it('Should show error message if the validation function fails', async () => {
	const validationFunction = jest.fn(() => 'Validation message');
	render(<FormInput id="test" type="string" label="Testing" icon={<></>} validate={validationFunction} />);
	const input = screen.getByRole('textbox');

	expect(screen.queryByTestId('form-input-error-message')).not.toBeInTheDocument();

	userEvent.type(input, 'testing');
	fireEvent.blur(input);

	await act(async () => {
		await new Promise(resolve => setTimeout(resolve, 0)); // Wait for the component to finish rendering and processing the onBlur event
	});

	expect(validationFunction).toHaveBeenCalled();
	const errorMessage = screen.getByTestId('form-input-error-message');
	expect(errorMessage).toBeInTheDocument();
});
