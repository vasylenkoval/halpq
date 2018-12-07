import React from 'react';

const UserDetails = props => (
  <div className="UserDetails--Image">
    <img src={props.user.photoURL} alt="" />
  </div>
);

// const UserMgmtStyle = {
//   width: '40px',
//   float: 'right',
//   display: 'inline-block',
//   margin: '0 300px 0 0  ',
// };

export default UserDetails;
