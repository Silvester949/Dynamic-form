import React, { memo } from 'react';
import PropTypes from 'prop-types';

// General Input Component (handles text, number, email, and date)
const GeneralInput = ({ field, value, handleChange, inputStyle, error }) => (
    <input
      id={field.name}
      type={field.type} // This will now dynamically set the input type
      name={field.name}
      value={value}
      onChange={handleChange}
      className={`form-input ${error ? 'input-error' : ''}`}
      style={inputStyle}
      aria-describedby={`${field.name}-error`}
    />
  );

// Select Input Component
const SelectInput = ({ field, value, handleChange, inputStyle }) => (
  <select
    id={field.name}
    name={field.name}
    value={value}
    onChange={handleChange}
    className="form-input"
    style={inputStyle}
  >
    {field.options.map(option => (
      <option key={option} value={option}>{option}</option>
    ))}
  </select>
);

// Radio Input Component
const RadioInput = ({ field, value, handleChange, labelStyle }) => (
  field.options.map(option => (
    <label key={`${field.name}-${option}`} style={labelStyle}>
      <input
        type="radio"
        name={field.name}
        value={option}
        checked={value === option}
        onChange={handleChange}
        className="form-input"
      />
      {option}
    </label>
  ))
);

// Checkbox Input Component
const CheckboxInput = ({ field, checked, handleChange, inputStyle }) => (
  <input
    type="checkbox"
    name={field.name}
    checked={checked}
    onChange={handleChange}
    className="form-input"
    style={inputStyle}
  />
);

const RenderField = memo(({ field, formData, handleChange, inputStyle, errors, labelStyle }) => {
    // Field properties for input components
    const fieldProps = {
        field,
        value: formData[field.name],
        handleChange,
        inputStyle,
        error: errors[field.name],
        labelStyle,
        name: field.name
      };

  // Render the appropriate component based on the field type
  switch (field.type) {
    case 'text':
    case 'number':
    case 'email':
    case 'date':
      // Use GeneralInput for text, number, email, and date inputs
      return <GeneralInput {...fieldProps} />;
    case 'select':
      return <SelectInput {...fieldProps} />;
    case 'radio':
      return <RadioInput {...fieldProps} />;
    case 'checkbox':
      return <CheckboxInput {...fieldProps} />;
    case 'custom':
      // Custom component rendering
      const CustomComponent = field.component;
      return (
        <CustomComponent
          {...fieldProps}
          // Pass any additional props that CustomComponent might need
        />
      );
    default:
      return null; // or some error/fallback UI
  }
});

RenderField.propTypes = {
    field: PropTypes.object.isRequired,
    formData: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    inputStyle: PropTypes.object,
    errors: PropTypes.object,
    labelStyle: PropTypes.object
  };

export default RenderField;
