
import React, { useState } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { register } from '../api/userApi';

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email_address: '',
    street_address: '',
    city: '',
    us_state: '',
    zip_code: '',
    phone_number: '',
    member_status: '',
    hash_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Registration successful!');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {[
        { label: 'First Name', name: 'first_name', type: 'text' },
        { label: 'Last Name', name: 'last_name', type: 'text' },
        { label: 'Date of Birth', name: 'date_of_birth', type: 'date' },
        { label: 'Email Address', name: 'email_address', type: 'email' },
        { label: 'Street Address', name: 'street_address', type: 'text' },
        { label: 'City', name: 'city', type: 'text' },
        { label: 'State (2-letter)', name: 'us_state', type: 'text', maxLength: 2 },
        { label: 'ZIP Code', name: 'zip_code', type: 'number' },
        { label: 'Phone Number', name: 'phone_number', type: 'tel' },
        { label: 'Member Status', name: 'member_status', type: 'text' },
        { label: 'Password', name: 'hash_password', type: 'password' }
      ].map(({ label, name, type, maxLength }) => (
        <FormGroup key={name}>
          <Label for={name}>{label}</Label>
          <Input
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            required
            maxLength={maxLength}
          />
        </FormGroup>
      ))}
      <Button type="submit" color="success">Register</Button>
    </form>
  );
};

export default RegisterForm;
