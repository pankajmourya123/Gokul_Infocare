import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const ListContainer = styled.div`
  margin: 20px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }

  h2 {
    text-align: center;
    color: #333;
    font-family: 'Arial', sans-serif;
    margin-bottom: 20px;
  }
`;

const UserItem = styled(motion.li)`
  list-style: none;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f1f1f1;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e9ecef;
  }
`;

const UserInfo = styled.div`
  flex: 1;
  margin-right: 20px;
  color: #555;
`;

const Button = styled(motion.button)`
  background-color: ${(props) => (props.edit ? '#4caf50' : '#f44336')};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.edit ? '#45a049' : '#e53935')};
  }
`;

const UserList = ({ users, setEditUser, deleteUser }) => {
  const handleDelete = (userId) => {
    deleteUser(userId);
    toast.error('User deleted successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <ListContainer>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <UserItem
            key={user._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.02 }}
          >
            <UserInfo>
              {user.firstName} {user.lastName} ({user.email})
            </UserInfo>
            <div>
              <Button
                edit
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEditUser(user)}
              >
                Edit
              </Button>
              <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </Button>
            </div>
          </UserItem>
        ))}
      </ul>
    </ListContainer>
  );
};

export default UserList;
