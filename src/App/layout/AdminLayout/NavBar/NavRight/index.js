import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import DEMO from "../../../../../store/constant";
import Avatar1 from "../../../../../assets/images/user/avatar-1.jpg";
import { useHistory } from "react-router-dom";
const NavRight = () => {
  const dept = JSON.parse(localStorage.getItem("dept"));
  const userData = JSON.parse(localStorage.getItem("user"));
  const user = userData === null ? null : userData[0];
  const userRole = localStorage.getItem("userRole");
  const history = useHistory();
  const roles = {
    ADMIN: "ADMIN",
    PATIENT: "PATIENT",
  };

  const UserGroup = (id) => {
    let UG = "";
    if (id == 1) {
      return "Admin";
    } else if (id == 2) {
      return "Doctor";
    } else if (id == 3) {
      return "Nurse";
    }
  };

  console.log(dept);

  function renderSettings() {
    if (userRole === roles.ADMIN) {
      return (
        <>
          <ul className="navbar-nav ml-auto">
            <li>
              <Dropdown alignRight={true} className="drp-user">
                <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                  <i className="icon feather icon-settings" />
                </Dropdown.Toggle>
                <Dropdown.Menu alignRight className="profile-notification">
                  <div className="pro-head">
                    <img
                      src={Avatar1}
                      className="img-radius"
                      alt="User Profile"
                    />
                    <span>{user.FirstName}</span>

                    <i
                      className="dud-logout feather icon-log-out"
                      onClick={() => {
                        localStorage.clear();
                        history.push("/admin");
                      }}
                    />
                  </div>
                  <ul className="pro-body">
                    <li className="dropdown-item">
                      <i className="feather icon-settings" /> Dept :{" "}
                      {dept.label}
                    </li>
                    <li className="dropdown-item">
                      <i className="feather icon-user" /> Email : {user.Email}
                    </li>
                    <li className="dropdown-item">
                      <i className="feather icon-user" /> Role :{" "}
                      {UserGroup(user.UserGroupId)}
                    </li>
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </>
      );
    } else {
      return null;
    }
  }

  return <>{renderSettings()}</>;
};

export default NavRight;
