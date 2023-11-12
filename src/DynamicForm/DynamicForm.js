import React, { useMemo } from 'react';
import './DynamicForm.css';
import useForm from '../hooks/useForm'; // Ensure correct import path
import { object } from 'yup';
import RenderField from './RenderField'; // A new component for rendering fields

const DynamicForm = ({
  schema,
  onSubmit,
  formStyle, 
  formGroupStyle, 
  labelStyle,
  inputStyle,
  buttonStyle,
  errorStyle
}) => {
  // Generate initial values based on the schema
  const initialValues = useMemo(() => 
    schema.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.initialValue || ''
    }), {}), [schema]);

  // Create a Yup validation schema based on the schema array
  const validationSchema = useMemo(() => 
    object().shape(
      schema.reduce((acc, field) => {
        if (field.validation) {
          acc[field.name] = field.validation;
        }
        return acc;
      }, {})
    ), [schema]);

  // Use the useForm custom hook
  const { formData, handleChange, handleSubmit, errors } = useForm(validationSchema, initialValues);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const data = await handleSubmit();
    onSubmit(data);
  };

  return (
    <form onSubmit={onFormSubmit} className="dynamic-form" style={formStyle}>
      {schema.map((field, index) => (
        <React.Fragment key={index}>
          <div className="form-group" style={formGroupStyle}>
            <label htmlFor={field.name} style={labelStyle}>{field.label}</label>
            <RenderField 
              field={field} 
              formData={formData} 
              handleChange={handleChange} 
              inputStyle={inputStyle} 
              errors={errors} 
              labelStyle={labelStyle} 
            />
            {errors[field.name] && <p className="error" style={errorStyle}>{errors[field.name]}</p>}
          </div>
        </React.Fragment>
      ))}
      <button type="submit" className="form-submit-button" style={buttonStyle}>
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
