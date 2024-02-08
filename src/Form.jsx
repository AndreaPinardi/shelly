import React, { useState } from 'react';
import { TextInput, Button, PasswordInput } from '@mantine/core';

function PasswordInputWithValidation() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    // Add more validation rules as needed
    setError('');
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validatePassword()) {
      // Submit your form or handle the password
      console.log('Password is valid:', password);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        error={error}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default PasswordInputWithValidation;