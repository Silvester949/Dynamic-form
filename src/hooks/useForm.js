// src/hooks/useForm.js
import { useState } from 'react';

const useForm = (schema, initialValues = {}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = async (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));

    // Validate the field
    try {
      await schema.validateAt(name, { [name]: newValue });
      setErrors(prev => ({ ...prev, [name]: '' }));
    } catch (error) {
      setErrors(prev => ({ ...prev, [name]: error.message }));
    }
  };

  const handleSubmit = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return formData; // Return formData for the onSubmit callback
    } catch (validationErrors) {
      if (validationErrors && validationErrors.inner) {
        // Proceed only if validationErrors has an inner array (Yup ValidationError)
        const newErrors = validationErrors.inner.reduce((acc, err) => ({
          ...acc,
          [err.path]: err.message
        }), {});
        setErrors(newErrors);
      } else {
        // Handle unexpected errors, perhaps log them or display a generic error message
        setErrors({ submit: 'An unexpected error occurred.' });
      }
      return {}; // Return an empty object to indicate validation failure
    }
  };  

  return { formData, handleChange, handleSubmit, errors };
};

export default useForm;
