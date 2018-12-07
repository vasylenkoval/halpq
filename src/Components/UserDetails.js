import React from 'react';

const UserDetails = props => (
  <div className="UserDetails">
    <h3 style={UserNameText} className="clearfix">
      Welcome {props.displayName}
    </h3>
    <div className="UserDetails--Image">
      <img style={UserDetailsImage} src={props.photoURL} alt="" />
    </div>
  </div>
);

const UserDetailsImage = {
  width: '60px',
  float: 'right',
  'border-radius': '50%',
};
const UserNameText = {
  'text-align': 'right',
  float: 'right',
  display: 'inline-block',
};

export default UserDetails;
