import React from 'react';
import * as Yup from 'yup';
import CustomInputComponent from './DynamicForm/CustomInputComponent'; // Make sure to create this component
import DynamicForm from './DynamicForm/DynamicForm';

const App = () => {
  const formSchema = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validation: Yup.string().required('Name is required'),
      initialValue: '',
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      validation: Yup.number().positive('Age must be positive').required('Age is required'),
      initialValue: '',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validation: Yup.string().email('Invalid email address').required('Email is required'),
      initialValue: '',
    },
    {
      name: 'birthday',
      label: 'Birthday',
      type: 'date',
      validation: Yup.date().required('Birthday is required'),
      initialValue: '',
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: ['Male', 'Female', 'Other'], // Add your options
      validation: Yup.string().required('Gender is required'),
      initialValue: 'Male',
    },
    {
      name: 'newsletter',
      label: 'Subscribe to Newsletter',
      type: 'checkbox',
      validation: Yup.boolean().required('Please select if you want to subscribe'),
      initialValue: false,
    },
    {
      name: 'contactTime',
      label: 'Preferred Contact Time',
      type: 'radio',
      options: ['Morning', 'Afternoon', 'Evening'], // Add your options
      validation: Yup.string().required('Please select a contact time'),
      initialValue: '',
    },
    {
      name: 'customField',
      label: 'Custom Field',
      type: 'custom',
      component: CustomInputComponent, // This is a custom React component
      validation: Yup.string().required('This custom field is required'),
      initialValue: '',
    }
  ];

  const handleSubmit = (formData) => {
    console.log('Form Data:', formData);
  };

  // Define custom styles as needed
  const labelStyles = { fontWeight: 'bold' };
  const inputStyles = { padding: '10px', margin: '5px 0' };
  const buttonStyles = { backgroundColor: 'blue', color: 'white', padding: '10px 15px' };
  const errorStyles = { color: 'red', fontSize: '0.8rem' };
  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  };
  
  const formGroupStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  };

  return (
    <div>
      <DynamicForm
        schema={formSchema}
        onSubmit={handleSubmit}
        formStyle={formStyles}
        formGroupStyle={formGroupStyles}
        labelStyle={labelStyles}
        inputStyle={inputStyles}
        buttonStyle={buttonStyles}
        errorStyle={errorStyles}
      />
    </div>
  );
};

export default App;
