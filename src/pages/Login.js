import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillGoogleCircle, AiFillApple, AiFillWindows } from "react-icons/ai";
import "font-awesome/css/font-awesome.min.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./login.css";
import googlelogo from "./googlelogo.svg";
import micro from "./micro.svg";
import apple from "./apple.svg";

import * as Yup from "yup";
// inital login credentials
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  // email: Yup.string()
  //   .email("Invalid Email address")
  //   .required("Email is required!"),
  // username: Yup.string()
  //   .email("Invalid Username")
  //   .required("Username is required!"),
});
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (e) {
      toast.error("An error occurred during login.");
      setLoading(false);
    }
  };
  return (
    <>
      <ToastContainer position="top-center" />
      <body class="account-page">
        <div class="main-wrapper">
          <div class="account-content">
            <div class="login-wrapper bg-img">
              <div class="overlay"></div>
              <div class="login-content logos">
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div class="login-userset">
                        <div class="login-userheading">
                          <div className="logo">
                            <p
                              style={{
                                fontSize: "30px",
                                fontWeight: "800",
                                textAlign: "center",
                                color: "black",
                              }}
                            >
                              {" "}
                              Let's sign you in
                            </p>
                          </div>
                          <h3
                            style={{
                              fontSize: "20px",
                              fontWeight: "800",
                              textAlign: "center",
                            }}
                          >
                            Welcome back, you have been missed
                          </h3>
                          {/*} <h4>
                            Keep your visions, dream in a safe place and see how
                            you can achieve it with DreamSimu
                          </h4>*/}
                        </div>
                        <div class="form-login mb-3">
                          <label class="form-label">Email Address</label>
                          <div class="form-addons">
                            <input
                              type="email"
                              value={values.email}
                              name="email"
                              onChange={handleChange}
                              class="form- control"
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>
                        <div class="form-login mb-3">
                          <label class="form-label">Password</label>
                          <div className="pass-group">
                            <input
                              value={values.password}
                              onChange={handleChange}
                              name="password"
                              type={showPassword ? "text" : "password"}
                              className="pass-input form-control"
                            />
                            <span
                              className="toggle-password"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <AiOutlineEyeInvisible />
                              ) : (
                                <AiOutlineEye />
                              )}
                            </span>
                          </div>
                        </div>

                        <div class="form-login authentication-check">
                          <div class="row">
                            <div class="col-12 d-flex align-items-center justify-content-between">
                              <div class="custom-control custom-checkbox">
                                <label class="checkboxs ps-4 mb-0 pb-0 line-height-1">
                                  <input type="checkbox" class="form-control" />
                                  <span class="checkmarks"></span>Remember me
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form-login" style={{ width: "100%" }}>
                          <button
                            loading={loading}
                            type="submit"
                            class="btn btn-login"
                            style={{ width: "100%" }}
                          >
                            Log in
                          </button>
                        </div>
                        <h5
                          style={{
                            textAlign: "center",
                            color: "black",
                            marginBottom: "20px",
                          }}
                        >
                          Or continue with{" "}
                        </h5>
                        <div class="form-login social-login-buttons">
                          <button
                            type="button"
                            class="btn btn-microsoft d-flex align-items-center justify-content-center mb-2"
                            style={{
                              width: "100%",
                              backgroundColor: "#fff",
                              color: "black",
                              border: "1px solid black",
                            }}
                          >
                            <img
                              src={googlelogo}
                              alt=""
                              style={{
                                width: "25px",
                                height: "25px",
                                marginRight: "10px",
                              }}
                            />
                            Continue with Google
                          </button>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "1rem",
                          }}
                        >
                          <div class="text-end">
                            <a
                              class="forgot-link"
                              href="/session/forgot-password"
                            >
                              Forgot Password?
                            </a>
                          </div>
                          <div class="text-end">
                            <a class="forgot-link" href="/register">
                              Create an account
                            </a>
                          </div>
                        </div>
                        {/*} <div class="signinform">
                      <h4>
                        New on our platform?
                        <a
                          href="https://dreamspos.dreamstechnologies.com/html/template/register.html"
                          class="hover-a"
                        >
                          {" "}
                          Create an account
                        </a>
                      </h4>
                    </div>*/}
                        {/*}   <div class="form-setlogin or-text">
                      <h4>OR</h4>
                    </div>
                    <div class="form-sociallink">
                      <ul class="d-flex">
                        <li>
                          <a href="javascript:void(0);" class="facebook-logo">
                            <img
                              src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/facebook-logo.svg"
                              alt="Facebook"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            <img
                              src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/google.png"
                              alt="Google"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);" class="apple-logo">
                            <img
                              src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/apple-logo.svg"
                              alt="Apple"
                            />
                          </a>
                        </li>
                      </ul>
                      <div class="my-4 d-flex justify-content-center align-items-center copyright-text">
                        <p>
                          Copyright &copy; 2023 DreamsPOS. All rights reserved
                        </p>
                      </div>
                    </div>*/}
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Login;
