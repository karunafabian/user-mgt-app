import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({  selectedEmployee, setUsers, setIsEditing }) => {
  const id = selectedEmployee.id;

  const [firstName, setFirstName] = useState(selectedEmployee.firstName);
  const [lastName, setLastName] = useState(selectedEmployee.lastName);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [phone, setPhone] = useState(selectedEmployee.phoneNumber);
  const [dob, setDob] = useState(selectedEmployee.dob);
  const [address, setAddress] = useState(selectedEmployee.address);

  const handleUpdate = async () => {
   // e.preventDefault();

    if (!firstName || !lastName || !email) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const employee = {
      id,
      firstName,
      lastName,
      email,
      phone,
      dob,
      address
    };

    
      const url = "https://ihjsrvkjtl.execute-api.us-east-2.amazonaws.com/api/users/" + id
      const data = {
        id: id,
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
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(res => res.json())
        .then(
          (data) => {
            console.log(data)
          },
          (error) => {
            console.error(error.message)
          }
      )

       
      }catch (error) {
        console.error(error.message)
      }

      await fetch("https://ihjsrvkjtl.execute-api.us-east-2.amazonaws.com/api/users")
      .then(res => res.json())
        .then(
            (data) => {
                setUsers(data);
            }
        )
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
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
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
