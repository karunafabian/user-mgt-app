import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ setUsers, setIsAdding }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');

  const handleAdd = async () => {
    //e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !dob || !address) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const url = "http://ec2-3-140-186-196.us-east-2.compute.amazonaws.com:8080/api/users" 
      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        status: "Active",
        phoneNumber: phone,
        dob: dob,
        address: address
      }
      try {
        await  fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(res => res.json())
     

       
      }catch (error) {
        console.error(error.message)
      }

      await fetch("http://ec2-3-140-186-196.us-east-2.compute.amazonaws.com:8080/api/users")
      .then(res => res.json())
        .then(
            (data) => {
                setUsers(data);
            }
        )
    
    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });

    setIsAdding(false);
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="text"
          name="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <label htmlFor="dob">DOB</label>
        <input
          id="dob"
          type="date"
          name="dob"
          value={dob}
          onChange={e => setDob(e.target.value)}
        />
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
