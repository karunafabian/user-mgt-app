import React from 'react';

const ActiveMQ = ({ messages, setIsActiveMQ }) => {

 
  return (
    <div className="small-container">
        <h1>ActiveMQ/AWS Messages</h1>
       
        <div style={{ marginTop: '30px' }}>
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Back"
            onClick={() => setIsActiveMQ(false)}
          />
        </div>

        <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Message</th>
            <th>Created Time</th>
            
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((message, i) => (
              <tr key={i}>
                <td>{message.id}</td>
                <td>{message.message}</td>
                <td>{message.createdTime}</td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
    </div>
  );
};

export default ActiveMQ;
