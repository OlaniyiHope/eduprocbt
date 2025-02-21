import React, { useState } from "react";
import TopNav from "./TopNav";
import { useSidebar } from "./SidebarProvider";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import Headers from "./Headers";

const All = () => {
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
  ];

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const navigate = useNavigate();
  const [expandedSubject, setExpandedSubject] = useState(null);
  const handleSubjectChange = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((item) => item !== subject));
    } else if (selectedSubjects.length < 4) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };
  // const handleSubjectChange = (subject) => {
  //   if (selectedSubjects.includes(subject)) {
  //     setSelectedSubjects(selectedSubjects.filter((item) => item !== subject));
  //   } else if (selectedSubjects.length < 4) {
  //     setSelectedSubjects([...selectedSubjects, subject]);
  //   }
  // };

  const toggleDropdown = (subject) => {
    setExpandedSubject(expandedSubject === subject ? null : subject);
  };
  const handleNextClick = () => {
    if (selectedSubjects.length > 0) {
      navigate("/practice", { state: { subjects: selectedSubjects } });
    }
  };

  return (
    <>
      <TopNav />
      <div className="main-wrapper">
        <div
          className="page-wrapper"
          style={{ marginBottom: "100px", width: "80%", margin: "auto" }}
        >
          <div className="content">
            <h6
              className="sasup-hero-title-4"
              style={{
                color: "#042954",
                fontSize: "24px",
                textAlign: "center",
              }}
            >
              Select the subjects you want to practice (Max: 4)
            </h6>
            <br />
            <div
              className="row"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className="col-md-2 col-sm-4"
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    id={`subject-${index}`}
                    value={subject}
                    checked={selectedSubjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                    disabled={
                      !selectedSubjects.includes(subject) &&
                      selectedSubjects.length >= 4
                    }
                    style={{ marginRight: "8px", cursor: "pointer" }}
                  />
                  <label
                    htmlFor={`subject-${index}`}
                    style={{ fontSize: "16px", cursor: "pointer" }}
                  >
                    {subject}
                  </label>
                </div>
              ))}
            </div>
            <br />
            {/* Three-column layout */}
            <div className="row">
              {/* Column 1: Selected Subjects List */}
              <div className="col-md-4">
                <h5 style={{ textAlign: "center" }}>Selected Subjects</h5>
                {selectedSubjects.length === 0 ? (
                  <p style={{ textAlign: "center", color: "gray" }}>
                    No subject selected
                  </p>
                ) : (
                  <ul className="list-group">
                    {selectedSubjects.map((subject, index) => (
                      <li
                        key={index}
                        className="list-group-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleDropdown(subject)}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          {subject}
                          <span>
                            {expandedSubject === subject ? "🔽" : "▶️"}
                          </span>
                        </div>

                        {/* Dropdown Form */}
                        {expandedSubject === subject && (
                          <div
                            style={{
                              marginTop: "10px",
                              padding: "10px",
                              border: "1px solid #ddd",
                              borderRadius: "5px",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Exam Year Dropdown */}
                            <label style={{ fontWeight: "bold" }}>
                              Exam Year:
                            </label>
                            <select className="form-control">
                              <option value="">Select Year</option>
                              <option value="2023">2023</option>
                              <option value="2022">2022</option>
                              <option value="2021">2021</option>
                              <option value="2020">2020</option>
                            </select>

                            {/* Number of Questions Dropdown */}
                            <label
                              style={{ fontWeight: "bold", marginTop: "10px" }}
                            >
                              Number of Questions:
                            </label>
                            <select className="form-control">
                              <option value="">Select</option>
                              <option value="10">10</option>
                              <option value="20">20</option>
                              <option value="30">30</option>
                              <option value="40">40</option>
                            </select>

                            {/* Topic Selection Dropdown */}
                            <label
                              style={{ fontWeight: "bold", marginTop: "10px" }}
                            >
                              Topic of Interest:
                            </label>
                            <select className="form-control">
                              <option value="">Select Topic</option>
                              <option value="Algebra">Algebra</option>
                              <option value="Geometry">Geometry</option>
                              <option value="Trigonometry">Trigonometry</option>
                              <option value="Statistics">Statistics</option>
                            </select>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Column 2: Placeholder (Future Content) */}
              <div className="col-md-4">
                <h5 style={{ textAlign: "center" }}>Column 2</h5>
                <p style={{ textAlign: "center", color: "gray" }}>
                  Future Content Here
                </p>
              </div>

              {/* Column 3: Placeholder (Future Content) */}
              <div className="col-md-4">
                <h5 style={{ textAlign: "center" }}>Column 3</h5>
                <p style={{ textAlign: "center", color: "gray" }}>
                  Future Content Here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default All;
