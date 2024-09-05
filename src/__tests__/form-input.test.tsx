import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import FormInput from '../components/form-input.component'
import { FormInputProps } from '../types'

describe('FormInput Component', () => {
  const defaultProps: FormInputProps = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    value: '',
    type: 'text',
    name: 'testInput',
    label: 'Test Input',
    error: '',
    placeholder: 'Enter text',
    variant: 'input',
  }

  it('renders input type by default', () => {
    const { getByLabelText } = render(<FormInput {...defaultProps} />)
    const inputElement = getByLabelText('Test Input')
    expect(inputElement).toBeInTheDocument()
  })

  it('renders textarea when variant is set to "textarea"', () => {
    const { getByLabelText } = render(
      <FormInput {...defaultProps} variant="textarea" />,
    )
    const textareaElement = getByLabelText('Test Input')
    expect(textareaElement.tagName.toLowerCase()).toBe('textarea')
  })

  it('calls onChange and onBlur functions when input changes', () => {
    const { getByLabelText } = render(<FormInput {...defaultProps} />)
    const inputElement = getByLabelText('Test Input')

    fireEvent.change(inputElement, { target: { value: 'test value' } })
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1)

    fireEvent.blur(inputElement)
    expect(defaultProps.onBlur).toHaveBeenCalledTimes(1)
  })

  it('displays an error message when error prop is provided', () => {
    const { getByText } = render(
      <FormInput {...defaultProps} error="Test error message" />,
    )
    const errorElement = getByText('Test error message')
    expect(errorElement).toBeInTheDocument()
  })

  it('applies styles for error state', () => {
    const { getByLabelText } = render(
      <FormInput {...defaultProps} error="Test error message" />,
    )
    const inputElement = getByLabelText('Test Input')
    expect(inputElement).toHaveClass('border-red-500')
  })
})
