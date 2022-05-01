import React, { useState } from "react";
import "./../../../assets/scss/style.scss";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../../configs/firebase";
import Axios from "axios";
import { BYSTANDER, REGISTRATION } from "../../../configs/apiRoutes";
import { useHistory } from "react-router-dom";
import CustomResponseMessage from "../../../App/components/CustomResponseMessage";
import { useDispatch } from "react-redux";
import { ChangeAuthType } from "../../../store/actions";
import { RESPONSETYPES } from "../../../constants";

const SignUp1 = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [phn, setPhn] = useState("");
  const [otp, setOtp] = useState("");
  const [otpStatus, setOtpStatus] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (formdata, e) => {
    RequestOTP(e, formdata.mobileNo);
    // submitUserData();
  };

  const submitUserData = () => {
    const formData = getValues();
    Axios.post(REGISTRATION, formData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        Axios.post(BYSTANDER, {
          patientId: res.data[0].Id,
          bystanderName: formData.byStanderName,
          phoneNo: formData.mobileNo,
        })
          .then((res) => {
            console.log(res);
            localStorage.setItem("byStanderId", res.data);
            localStorage.setItem("isAuthed", true);
            setLoading(false);
            dispatch(ChangeAuthType("PATIENT"));
            history.push("/app");
          })
          .catch((err) => {
            setLoading(false);
            setError(true);
            setErrorMessage(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setErrorMessage(err);
      });
  };

  const generateRecapcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recapcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };

  const RequestOTP = (e, phn) => {
    setLoading(true);
    e.preventDefault();
    generateRecapcha();
    const phoneNumber = "+91" + phn;
    const appVerifier = window.recaptchaVerifier;
    console.log(phoneNumber);
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        setOtpStatus(true);
        setLoading(false);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        setLoading(false);
        alert("SMS not sent");
        console.log(error);
      });
  };

  const onSubmitOTP = (e, data) => {
    setLoading(true);
    e.preventDefault();
    const code = otp;
    if (otp.length == 6) {
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(JSON.stringify(user));
          alert("User is verified");
          // ...
          submitUserData();
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          setLoading(false);
        });
    }
  };

  return (
    <>
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
                <i className="feather icon-user-plus auth-icon" />
              </div>
              <h3 className="mb-4">Registration</h3>
              {error && <CustomResponseMessage type={RESPONSETYPES.ERROR} />}
              {errors && // 👈 null and undefined check
                Object.keys(errors).length !== 0 && (
                  <CustomResponseMessage customMessage />
                )}
              <div className="input-group mb-3">
                <input
                  type="text"
                  {...register("patientName", { required: true })}
                  className="form-control"
                  placeholder="Patient Name"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  {...register("room", { required: true })}
                  placeholder="Enter Room Number"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  {...register("uhid", { required: true })}
                  placeholder=" Enter UHID"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  {...register("ipNo", { required: true })}
                  className="form-control"
                  placeholder="Enter IP NO"
                />
              </div>
              <div id="recapcha-container" placeholder=""></div>
              <div className="mb-4 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Mobile Number"
                  {...register("mobileNo", { required: true })}
                  // onChange={(e) => setPhn(e.target.value)}
                />
              </div>

              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  {...register("byStanderName", { required: true })}
                  placeholder="By Stander Name"
                />
              </div>
              {/* <div className="input-group mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="By Stander Name"
                />
              </div> */}
              {!otpStatus && (
                <div className="input-group mb-2 d-flex justify-content-center">
                  <button
                    // disabled={Object.keys(errors).length > 0}
                    className="btn btn-primary shadow-2 mb-2 mr-4"
                    onClick={handleSubmit(onSubmit)}
                    // onClick={() => handleSubmit()}
                  >
                    {loading ? "Please wait ..." : "GET OTP"}
                  </button>
                </div>
              )}

              {otpStatus && (
                <div className="input-group mb-2 d-flex justify-content-center">
                  <button
                    disabled={otpStatus === ""}
                    // onClick={(e) => handleSubmit(onSubmit, e)}
                    onClick={(e) => onSubmitOTP(e)}
                    className="btn btn-primary shadow-2 mb-4 mr-4"
                  >
                    {loading ? "Please wait ..." : "Register"}
                  </button>
                </div>
              )}

              {otpStatus && (
                <>
                  <div className="input-groupd-flex d-flex-column justify-content-center">
                    <p className="text-success">
                      OTP has been successfully sent to mobile
                    </p>
                  </div>
                  <div className="input-group mb-4 d-flex d-flex-column justify-content-center">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the OTP Here"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                </>
              )}
              {/* <p className="mb-0 text-muted">
                Admin Login ? <NavLink to="/admin/login">Click here</NavLink>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp1;
