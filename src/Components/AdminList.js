import React, { Component } from "react";
import { makeStudent } from "./globalFunctions";
import arrow from "../assets/arrow-left.svg";

class AdminList extends Component {
  render() {
    return (
      <div className="userList">
        {this.props.admins.map((admin) => (
          <div className="userList__user admin clearfix" key={admin[0]}>
            <div className="user__details">
              <h4>{admin[1].displayName}</h4>
              <p>{admin[1].email}</p>
            </div>
            <div className="user__action">
              <button
                className="user__button clearfix"
                type="button"
                onClick={() => {
                  makeStudent(`${admin[0]}`);
                }}
              >
                {/* Pleb-ize */}
                <div className="buttonImage">
                  <img src={arrow} alt="make user a student" />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default AdminList;
