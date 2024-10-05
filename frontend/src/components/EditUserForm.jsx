import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const FormContainer = styled(motion.div)`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled(motion.h2)`
  text-align: center;
  color: #333;
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;

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
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;

const EditUserForm = ({ user, onUserUpdated }) => {
  const [userData, setUserData] = useState(user);
  const [error, setError] = useState('');

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:7000/api/users/${user._id}`, userData);
      onUserUpdated();
      toast.success('User updated successfully!');
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <FormContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Title
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Edit User
      </Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
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
          Update User
        </Button>
      </form>
    </FormContainer>
  );
};

export default EditUserForm;
