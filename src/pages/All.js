import React, { useState } from "react";
import TopNav from "./TopNav";
import { useSidebar } from "./SidebarProvider";

import "./admin.css";
import Header from "./Header";

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

  const years = Array.from({ length: 10 }, (_, index) => 2024 - index); // Generates last 20 years

  // State to track selected subject and year
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // const handleSubjectClick = (subject) => {
  //   setSelectedSubject(subject);
  // };
  const handleSubjectClick = (subject) => {
    if (selectedSubjects.includes(subject)) {
      // If the subject is already selected, remove it from the array
      setSelectedSubjects(selectedSubjects.filter((item) => item !== subject));
    } else {
      // If it's not selected yet and we haven't selected 4 subjects, add it
      if (selectedSubjects.length < 4) {
        setSelectedSubjects([...selectedSubjects, subject]);
      }
    }
  };
  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  return (
    <div>
      <body>
        <div className={`main-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <div
            className="page-wrapper"
            style={{ marginBottom: "100px", width: "80%", margin: "auto" }}
          >
            <div className="content">
              <h6
                class="sasup-hero-title-4"
                style={{ color: "#042954", fontSize: "34px" }}
              >
                Select the subject you want to practice
              </h6>
              <br></br>
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
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default All;
