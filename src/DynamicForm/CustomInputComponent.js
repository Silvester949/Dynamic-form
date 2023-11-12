import React from 'react';

const CustomInputComponent = ({ id, name, value, handleChange, className, style }) => {
  // Debugging the onChange event
  const handleChangeInput = (e) => {
    console.log(name, e.target.value);
    handleChange(e); // Call the passed onChange function
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <input
        id={id}
        type="text"
        name={name}
        value={value}
        onChange={handleChangeInput} // Use the local handleChange for debugging
        className={className}
        style={style}
      />
    </div>
  );
};



export default CustomInputComponent;
