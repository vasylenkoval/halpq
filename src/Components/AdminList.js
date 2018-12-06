import React, { Component } from 'react';
import { makeStudent } from './globalFunctions';

class AdminList extends Component {
  render() {
    return(
    <div>
      {this.props.admins.map( admin => {
          return <div className="admin" key={admin[0]}>
              <h3>{admin[1].displayName}</h3>
              <p>{admin[1].email}</p>
              <button type="button" onClick={()=>{ makeStudent(`${admin[0]}`)}}>Make me a student</button>
            </div>;
      })}

    </div>
    );
  }
}

export default AdminList;
