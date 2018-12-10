import React from 'react';
import log from "../assets/logOut.svg";


const UserDetails = props => (
  <div className="userDetails">
    <button className="logOut" type="button" onClick={props.logOut}>
      <div className="logOut__img">
        <img src={log} alt="log out" />
      </div>
    </button>
    <div className="userDetails__image">
      <img src={props.photoURL} alt="user photo" />
    </div>
    <div className="userDetails__text">
        <p>Welcome</p>
      <p className="clearfix">{props.displayName}</p>
    </div>
  </div>
);


const UserNameText = {
  textAlign: 'left',
  // float: 'right',
};

export default UserDetails;
