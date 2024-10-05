import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const FormContainer = styled(motion.div)`
  background-color: #f7f9fc;
  padding: 30px;
  border-radius: 10px;
  max-width: 400px;
  margin: 40px auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const Button = styled(motion.button)`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled(motion.p)`
  color: red;
  margin: 10px 0;
  font-size: 14px;
`;

const AddUserForm = ({ onUserAdded }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    const { firstName, lastName, phoneNumber, email, address } = userData;

    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName)) {
      return 'First name should contain only alphabets';
    }
    if (!nameRegex.test(lastName)) {
      return 'Last name should contain only alphabets';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return 'Phone number must be exactly 10 digits';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    if (!address) {
      return 'Address cannot be empty';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      await axios.post('http://localhost:7000/api/users/create', userData);
      onUserAdded();

      setUserData({ firstName: '', lastName: '', phoneNumber: '', email: '', address: '' });
      toast.success('User added successfully!');
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong');
      toast.error('Failed to add user!');
    }
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Title>Add New User</Title>
      {error && (
        <ErrorMessage
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </ErrorMessage>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <Input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <Input
          type="text"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <Input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <Input
          type="text"
          name="address"
          value={userData.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <Button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add User
        </Button>
      </form>
    </FormContainer>
  );
};

export default AddUserForm;
