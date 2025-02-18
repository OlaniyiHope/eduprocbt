import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
  email: "",
  password: "",
  username: "",
  phone: "",
  address: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Full name is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required!"),
  phone: Yup.string(),
  address: Yup.string(),
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const dataToSubmit = {
        ...values,
        role: "student", // Default role
      };

      console.log("Submitting values:", dataToSubmit);

      const response = await axios.post(`${apiUrl}/api/register`, dataToSubmit);

      if (response.status === 201) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

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
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="login-userset">
                      <div className="login-userheading">
                        <h2 className="logo" style={{ textAlign: "center" }}>
                          Let's register your account
                        </h2>
                      </div>
                      <div className="form-login mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          placeholder="Enter your full name"
                        />
                        {touched.username && errors.username && (
                          <small className="text-danger">
                            {errors.username}
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
                      <div className="form-login mb-3">
                        <label className="form-label">Phone (Optional)</label>
                        <input
                          type="text"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="form-login mb-3">
                        <label className="form-label">Address (Optional)</label>
                        <input
                          type="text"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                          placeholder="Enter your address"
                        />
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
