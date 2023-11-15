
# Dynamic Form Library

Dynamic Form is a React component library designed to create dynamic forms based on a JSON schema with integrated validation using Yup.

## Features

- **Dynamic Field Generation**: Automatically generate form fields from a JSON schema.
- **Yup Validation**: Leverage Yup for powerful schema validation to ensure data integrity.
- **Custom Components**: Easily integrate custom React components within your forms.
- **Styling Flexibility**: Apply custom styles to individual form elements for a personalized look and feel.



## Installation

Install Dynamic Form with npm:

```bash
npm install Dynamic-form
```
or yarn 
```bash
  yarn add Dynamic-form
```
## Usage:

```javascript
import React from 'react';
import DynamicForm from 'your-library-name';
import * as Yup from 'yup';

// Define your form schema
const formSchema = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    validation: Yup.string().required('Name is required'),
    initialValue: '',
  },
  // Add more fields as needed
];

// Component using DynamicForm
const App = () => {
  const handleSubmit = (formData) => {
    // Handle form data submission
    console.log('Form Data:', formData);
  };

  return (
    <DynamicForm
      schema={formSchema}
      onSubmit={handleSubmit}
      // Add any additional props here
    />
  );
};

export default App;
```


## Form Schema
The formSchema prop should be an array of objects where each object represents a field in the form and includes properties like name, label, type, validation, and initialValue.

## Custom styling

You can customize styles by passing style objects to these props:

* **formStyle**
* **formGroupStyle**
* **labelStyle**
* **inputStyle**
* **buttonStyle**
* **errorStyle**