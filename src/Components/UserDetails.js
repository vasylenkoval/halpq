import React from 'react';

const UserDetails = props => (
  <div className="UserDetails">
    <h3 style={UserNameText} className="clearfix">
      <div>Welcome</div>
      <div style={UserNameText}>{props.displayName}</div>
    </h3>
    <div className="UserDetails--Image">
      <img style={UserDetailsImage} src={props.photoURL} alt="" />
    </div>
  </div>
);

const UserDetailsImage = {
  width: '60px',
  float: 'right',
  borderRadius: '50%',
};
const UserNameText = {
  textAlign: 'left',
  float: 'right',
};

export default UserDetails;
