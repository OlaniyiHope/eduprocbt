import React, { useState } from "react";
import TopNav from "./TopNav";
import { useSidebar } from "./SidebarProvider";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import Headers from "./Headers";
const All = () => {
  const { isSidebarOpen } = useSidebar(); // Sidebar state
  const subjects = [
    "Mathematics",
    "English Language",
    "Literature",
    "Biology",
    "Chemistry",
    "Physics",
    "Geography",
    "History",
    "Economics",
    "Commerce",
    "Accounting",
    "Government",
    "Computer Science",
    "Agriculture",
    "Civic Education",
    "Further Mathematics",
    "Technical Drawing",
    "Home Economics",
    "French",
    "Music",
  ];

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSubjectClick = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((item) => item !== subject));
    } else if (selectedSubjects.length < 4) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleNextClick = () => {
    if (selectedSubjects.length > 0) {
      setStep(2);
    }
  };

  return (
    <>
      <Headers />

      <div className={`main-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div
          className="page-wrapper"
          style={{ marginBottom: "100px", width: "80%", margin: "auto" }}
        >
          <div className="content">
            {step === 1 && (
              <>
                <h6
                  className="sasup-hero-title-4"
                  style={{ color: "#042954", fontSize: "34px" }}
                >
                  Select the subject you want to practice
                </h6>
                <br />
                <div className="row">
                  {subjects.map((subject, index) => (
                    <div
                      key={index}
                      className="col-md-4 col-sm-6"
                      style={{ marginBottom: "20px" }}
                    >
                      <div
                        className={`card text-center ${
                          selectedSubjects.includes(subject) ? "selected" : ""
                        }`}
                        onClick={() => handleSubjectClick(subject)}
                        style={{
                          padding: "20px",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                          borderRadius: "8px",
                          backgroundColor: selectedSubjects.includes(subject)
                            ? "#042954"
                            : "white",
                          color: selectedSubjects.includes(subject)
                            ? "white"
                            : "black",
                          cursor: "pointer",
                          position: "relative",
                        }}
                      >
                        <h4 className="card-title">{subject}</h4>
                        {selectedSubjects.includes(subject) && (
                          <span
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}
                          >
                            ✅
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleNextClick}
                  className="btn btn-primary"
                  disabled={selectedSubjects.length === 0}
                  style={{
                    padding: "10px 30px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    cursor:
                      selectedSubjects.length === 0 ? "not-allowed" : "pointer",
                    marginBottom: "50px",
                  }}
                >
                  Next
                </button>
              </>
            )}

            {step === 2 && (
              <div className="contact-area">
                <div className="container">
                  <div className="row pb-140 justify-content-between">
                    <div className="col-xxl-12 col-xl-12 col-lg-12">
                      <div className="contact-info-left-top mb-30">
                        <h4
                          className="contact-info-title"
                          style={{ color: "#042954" }}
                        >
                          Other Information
                        </h4>
                      </div>
                      <div
                        className="contact-form wow fadeInUp mb-50 mb-xl-0"
                        data-wow-delay=".2s"
                      >
                        <form action="#" method="post" id="contact-form">
                          <div className="row">
                            {[
                              {
                                label: "Full Name",
                                type: "text",
                                name: "name",
                                placeholder: "Name",
                              },
                              {
                                label: "Email",
                                type: "email",
                                name: "email",
                                placeholder: "Email",
                              },
                              {
                                label: "Phone Number",
                                type: "number",
                                name: "phone",
                                placeholder: "Phone Number",
                              },
                              {
                                label: "Username",
                                type: "text",
                                name: "username",
                                placeholder: "Username",
                              },
                              {
                                label: "Password",
                                type: "password",
                                name: "password",
                                placeholder: "Password",
                              },
                              {
                                label: "Confirm Password",
                                type: "password",
                                name: "confirmPassword",
                                placeholder: "Confirm Password",
                              },
                            ].map((field, index) => (
                              <div key={index} className="col-xl-6 col-md-6">
                                <div className="post-input post-input-2">
                                  <label
                                    htmlFor={field.name}
                                    className="post-input-label-defualt"
                                  >
                                    {field.label} *
                                  </label>
                                  <input
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    placeholder={field.placeholder}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            className="sasup-theme-btn sasup-theme-btn-2 transition-5"
                            href="/dashboard"
                          >
                            <a href="/dashboard" style={{ color: "white" }}>
                              Sign Up
                            </a>
                          </button>
                        </form>
                        <p className="ajax-response"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default All;
