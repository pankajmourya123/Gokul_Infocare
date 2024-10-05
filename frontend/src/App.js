import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
const Container = styled.div`
  margin: 20px;
  padding: 20px;
  max-width: 100%;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  min-width: 300px;
`;

const ListContainer = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
`;

const App = () => {
  const [editUser, setEditUser] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://gokul-infocare.onrender.com/api/users');
      setUsers(response.data);
    } catch (error) {
      toast.error('Error fetching users');
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserChange = () => {
    setEditUser(null);
    fetchUsers();
   
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://gokul-infocare.onrender.com/api/users/${userId}`);
        fetchUsers();
      } catch (error) {
        toast.error('Error deleting user');
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Header>GOKUL_INFOCARE</Header>
      <ContentWrapper>
        {!editUser ? (
          <>
            <FormContainer>
              <AddUserForm onUserAdded={handleUserChange} />
            </FormContainer>
            <ListContainer>
              <UserList users={users} setEditUser={setEditUser} deleteUser={deleteUser} />
            </ListContainer>
          </>
        ) : (
          <EditUserForm user={editUser} onUserUpdated={handleUserChange} />
        )}
      </ContentWrapper>
    </Container>
  );
};

export default App;
