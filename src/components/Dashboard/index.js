import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Search from './Search';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import ActiveMQ from './ActiveMQ';

const Dashboard = ({ setIsAuthenticated }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isActiveMQ, setIsActiveMQ] = useState(false);

  const [users, setUsers] = useState([false]);  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      fetch("http://ec2-3-140-186-196.us-east-2.compute.amazonaws.com:8080/api/users")
          .then(res => res.json())
          .then(
              (data) => {
                  setUsers(data);
              },
              (error) => {
                  console.error(error);
              }
          )
    }, []);

  const handleEdit = id => {
    const [user] = users.filter(user => user.id === id);

    setSelectedEmployee(user);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [user] = users.filter(user => user.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${user.firstName} ${user.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        
          fetch("http://ec2-3-140-186-196.us-east-2.compute.amazonaws.com:8080/api/users/"+id,
          {
            method: "DELETE"
          })
              .then(res => res.json())
              .then((error) => {
                      console.error(error);
                  }
              )
        

        const usersCopy = users.filter(user => user.id !== id);
        setUsers(usersCopy);
      }
    });
  };

  const handleMessages = e => {

    const url = "http://ec2-3-140-186-196.us-east-2.compute.amazonaws.com:8080/api/messages"; 

      try {
        
         fetch(url)
        .then(res => res.json())
          .then(
              (data) => {
                console.log(data)
                setMessages(data);
              },
              (error) => {
                console.error(error.message)
              }
          )

       
      }catch (error) {
        console.error(error.message)
      }
      setIsActiveMQ(true);
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && !isActiveMQ && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsActiveMQ={setIsActiveMQ}
            handleMessages={handleMessages}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Search
            setUsers={setUsers}
          />
          <Table
            users={users}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
        setUsers={setUsers}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          selectedEmployee={selectedEmployee}
          setUsers={setUsers}
          setIsEditing={setIsEditing}
        />
      )}
      {isActiveMQ && (
        <ActiveMQ
        messages={messages}
          setIsActiveMQ={setIsActiveMQ}
        />
      )}
    </div>
  );
};

export default Dashboard;
