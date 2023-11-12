import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DynamicForm from './DynamicForm'; // Ensure this path is correct

import * as Yup from 'yup';

// Schema for the 'name' field
const formSchema = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    validation: Yup.string().required('Name is required'),
    initialValue: '',
  },
  // ... other fields if necessary
]

describe('DynamicForm Component - Name Field', () => {
  const mockSubmit = jest.fn();

  test('renders the name field', () => {
    render(<DynamicForm schema={formSchema} onSubmit={mockSubmit} />);
    const nameInput = screen.getByLabelText('Name');
    expect(nameInput).toBeInTheDocument();
  });

  test('updates name field value on change', () => {
    render(<DynamicForm schema={formSchema} onSubmit={mockSubmit} />);
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });

  test('displays error when name field is empty and submitted', async () => {
    render(<DynamicForm schema={formSchema} onSubmit={mockSubmit} />);

    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
  });

  test('calls onSubmit with name field data when form is valid', async () => {
  render(<DynamicForm schema={formSchema} onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        // ...expected values for other fields if they exist
      });
    });
  });
});
