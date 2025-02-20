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
import axios from "axios";
import * as Yup from "yup";
const initialValues = {
  fullname: "",
  username: "",
  email: "",
  phone: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone Number must contain only digits")
    .min(10, "Phone Number must be at least 10 digits")
    .max(15, "Phone Number must be at most 15 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await register(
        values.fullname,
        values.phone,
        values.username,
        values.email,
        values.password
      );

      if (!response || !response.status) {
        throw new Error("Invalid response from server.");
      }

      if (response.status === 201) {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // const redirectToGoogle = () => {
  //   console.log("Redirecting to Google OAuth...");
  //   window.location.href = `${process.env.REACT_APP_API_URL}/api/google`;
  // };

  // useEffect(() => {
  //   console.log("GoogleOauth useEffect triggered");
  //   console.log("Full URL:", window.location.href);

  //   const urlParams = new URLSearchParams(window.location.search);
  //   const accessToken = urlParams.get("accessToken");
  //   const refreshToken = urlParams.get("refreshToken");

  //   console.log("Extracted Tokens from URL:", { accessToken, refreshToken });

  //   if (accessToken && refreshToken) {
  //     console.log("Tokens found! Storing them in localStorage.");
  //     localStorage.setItem("jwtToken", accessToken);
  //     localStorage.setItem("refreshToken", refreshToken);
  //     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  //     console.log("Tokens saved! Navigating to /vision...");
  //     navigate("/dashboard", { replace: true });
  //   } else {
  //     console.log("No valid tokens found in URL. Staying on /login.");
  //   }
  // }, [navigate]);
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="main-wrapper">
        <div className="account-content">
          <div className="login-wrapper bg-img">
            <div className="login-content logos">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="login-userset">
                      <div className="login-userheading">
                        <h3 style={{ textAlign: "center", marginTop: "40px" }}>
                          Welcome, lets create your account
                        </h3>
                      </div>
                      <div className="form-login mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          name="fullname"
                          value={values.fullname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          placeholder="Enter your full name"
                        />
                        {touched.fullname && errors.fullname && (
                          <small className="text-danger">
                            {errors.fullname}
                          </small>
                        )}
                      </div>
                      <div className="form-login mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          placeholder="Enter your email"
                        />
                        {touched.email && errors.email && (
                          <small className="text-danger">{errors.email}</small>
                        )}
                      </div>
                      <div className="form-login mb-3">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          placeholder="Enter your email"
                        />
                        {touched.username && errors.username && (
                          <small className="text-danger">
                            {errors.username}
                          </small>
                        )}
                      </div>
                      <div className="form-login mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="number"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          placeholder="Phone Number"
                        />
                        {touched.phone && errors.phone && (
                          <small className="text-danger">{errors.phone}</small>
                        )}
                      </div>

                      <div className="form-login mb-3">
                        <label className="form-label">Password</label>
                        <div className="pass-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
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
                        {touched.password && errors.password && (
                          <small className="text-danger">
                            {errors.password}
                          </small>
                        )}
                      </div>

                      <div className="form-login" style={{ width: "100%" }}>
                        <button
                          type="submit"
                          className="btn btn-login"
                          style={{ width: "100%" }}
                          disabled={loading}
                        >
                          {loading ? "Signing Up..." : "Sign Up"}
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
                        {/*} <button
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
                          href="/session/google"
                          style={{
                            width: "25px",
                            height: "25px",
                            marginRight: "10px",
                          }}
                        />
                        Continue with Google
                      </button>*/}
                        <button
                          onClick={() => {
                            setFieldValue("isGoogleSignUp", true); // Mark Google signup
                            // redirectToGoogle(); // Redirect to OAuth
                          }}
                          // onClick={redirectToGoogle}
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
                            src={micro}
                            alt=""
                            style={{
                              width: "25px",
                              height: "25px",
                              marginRight: "10px",
                            }}
                          />
                          Continue with Microsoft
                        </button>
                        <button
                          type="button"
                          class="btn btn-apple d-flex align-items-center justify-content-center"
                          style={{
                            width: "100%",
                            backgroundColor: "#fff",
                            color: "black",
                            border: "1px solid black",
                          }}
                        >
                          <img
                            src={apple}
                            alt=""
                            style={{
                              width: "25px",
                              height: "25px",
                              marginRight: "10px",
                            }}
                          />
                          Continue with Apple
                        </button>
                      </div>
                      <div className="text-end mt-3">
                        <a href="/login" className="forgot-link">
                          Already have an account? Login
                        </a>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
