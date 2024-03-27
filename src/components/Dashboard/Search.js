import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Search = ({ setUsers}) => {
  const [searchParam, setSearchParam] = useState('');
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = e => {
    e.preventDefault();

    if (!searchVal || !searchParam) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    let url = "https://ihjsrvkjtl.execute-api.us-east-2.amazonaws.com/api/users/filter?";
    if(searchParam ==="id") {
      url = url + "id=" + searchVal;
    } else if (searchParam ==="firstName"){
      url = url + "firstname=" + searchVal;
    } else if (searchParam ==="lastName"){
      url = url + "lastname=" + searchVal;
    } else if (searchParam ==="email"){
      url = url + "email=" + searchVal;
    }

      try {
        
         fetch(url)
        .then(res => res.json())
          .then(
              (data) => {
                console.log(data)
                  setUsers(data);
              },
              (error) => {
                console.error(error.message)
              }
          )

       
      }catch (error) {
        console.error(error.message)
      }

 };

  const handleAll = e => {
    e.preventDefault();

    const url = "https://ihjsrvkjtl.execute-api.us-east-2.amazonaws.com/api/users"; 

      try {
        
         fetch(url)
        .then(res => res.json())
          .then(
              (data) => {
                console.log(data)
                  setUsers(data);
              },
              (error) => {
                console.error(error.message)
              }
          )

       
      }catch (error) {
        console.error(error.message)
      }

  };

  return (
    <div className="container">
      <form onSubmit={handleSearch}>
        
      <label>Choose && Search :</label>
      <div className="container-search">
      
      <select style={{ width: '15%'}} name="filter" id="filter" value={searchParam} onChange={e => setSearchParam(e.target.value)}>
      <option value="" disabled hidden>Choose here</option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="id">Id</option>
        <option value="email">Email</option>
      </select>
      <input
              id="search"
              type="text"
              name="search"
              placeholder="Type here"
              value={searchVal}
              style={{ width: '30%'}}
              onChange={e => setSearchVal(e.target.value)}
            />
      
      <input type="submit" value="Search"/>
      <button onClick={handleAll}>All Users</button>
      </div>
      <br/>
       
      </form>
    </div>
  );
};

export default Search;
