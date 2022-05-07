import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Select from "react-select";
import { dropDownvalues, getStation } from "../../../configs/helpers";
import useFetch from "../../../configs/useFetch";
import { DEPARTMENTS, NURSINGSTATIONS, USER } from "../../../configs/apiRoutes";
import { Spinner } from "react-bootstrap";
import Axios from "axios";
import CustomResponseMessage from "../../../App/components/CustomResponseMessage";
import { RESPONSETYPES } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { ChangeAuthType } from "../../../store/actions";

const SignUp1 = () => {
  const dispatch = useDispatch();
  const NS_DEPT = useSelector((state) => state.NS_DEPT);
  const history = useHistory();
  const { data: deptData = [], loading } = useFetch(DEPARTMENTS);
  const { data: NSData = [], NSloading } = useFetch(NURSINGSTATIONS);
  const [error, setError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [state, setState] = useState({
    email: null,
    password: null,
    dept: { label: "", value: "" },
    NS: null,
  });

  const handleDeptChange = (selectedOption) => {
    setState({ ...state, dept: selectedOption });
  };
  const handleNSChange = (selectedOption) => {
    setState({ ...state, NS: selectedOption });
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const LoginHandler = () => {
    // validation

    if (state.email && state.password && state.dept.label !== "") {
      setError(false);
      Axios.get(`/api/Login/${state.email}/${state.password}`)
        .then((res) => {
          dispatch(ChangeAuthType("ADMIN"));
          localStorage.setItem("isAdmin", true);
          localStorage.setItem("userRole", "ADMIN");
          localStorage.setItem("dept", JSON.stringify(state.dept));
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("NS", JSON.stringify(state.NS));
          history.push("/admin/depts");
        })
        .catch((err) => {
          setLoginError(true);
        });
      // dispatch(ChangeAuthType("ADMIN"));
      // localStorage.setItem("isAdmin", true);
      // localStorage.setItem("dept", JSON.stringify(state.dept));
      // // localStorage.setItem("user", JSON.stringify(res.data));
      // localStorage.setItem("NS", JSON.stringify(state.NS));
      // history.push("/admin/depts");
      // console.log("inside login handler");
    } else {
      setError(true);
    }
  };

  console.log(state);

  function renderDeptSelect() {
    if (deptData?.length > 0) {
      let data = dropDownvalues(deptData);
      return (
        <div className=" mb-4">
          <Select
            className="basic-single"
            classNamePrefix="select department"
            placeholder="Select Department"
            // defaultValue={getStation(deptData, 1)}
            options={data}
            onChange={handleDeptChange}
          />
        </div>
      );
    } else
      return (
        <div className=" mb-4">
          <Select
            className="basic-single"
            classNamePrefix="select department"
            placeholder="Select Department"
            // defaultValue={getStation(deptData, 1)}
            options={[]}
            //  onChange={handleDeptChange}
          />
        </div>
      );
  }
  function renderNSSelect() {
    if (NSData?.length > 0) {
      let data = dropDownvalues(NSData);
      return (
        <div className=" mb-4">
          <Select
            className="basic-single"
            classNamePrefix="select department"
            placeholder="Select Nursing Station"
            options={data}
            onChange={handleNSChange}
          />
        </div>
      );
    } else return <Spinner />;
  }

  return (
    <Aux>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Admin Login</h3>
              {error && <CustomResponseMessage customMessage />}
              {loginError && (
                <CustomResponseMessage
                  type={RESPONSETYPES.ERROR}
                  customMessage
                  msg="Login Failed Please try again"
                />
              )}
              <div className="input-group mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={onChange}
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="password"
                  name="password"
                  onChange={onChange}
                  className="form-control"
                  placeholder="password"
                />
              </div>

              {renderDeptSelect()}
              {state.dept.value == NS_DEPT ? renderNSSelect() : null}
              {/* <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                  <input
                    type="checkbox"
                    name="checkbox-fill-1"
                    id="checkbox-fill-a1"
                  />
                  <label htmlFor="checkbox-fill-a1" className="cr">
                    {" "}
                    Save credentials
                  </label>
                </div>
              </div> */}
              <button
                className="btn btn-primary shadow-2 mb-4"
                onClick={() => LoginHandler()}
              >
                Login
              </button>
              {/* <p className="mb-2 text-muted">
                Forgot password ?
                <NavLink to="/auth/reset-password-1">Reset</NavLink>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default SignUp1;
