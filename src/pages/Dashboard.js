import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import TopNav from "./TopNav";
import { FaEdit, FaTrash } from "react-icons/fa";

import "./admin.css";
import { useSidebar } from "./SidebarProvider";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth(); // Access the authenticated user
  const [points, setPoints] = useState([]);
  const { isSidebarOpen } = useSidebar(); // use context to get sidebar state
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [currentPage, setCurrentPage] = useState(1);

  const [visions, setVisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisions = async () => {
      try {
        // Get the token from localStorage or a global state
        const token = localStorage.getItem("jwtToken"); // Change this based on your actual method of storing the token

        if (!token) {
          console.error("No authentication token found");
          return;
        }
        console.log("API URL:", `${apiUrl}/api/get-all`);
        console.log("Auth Token:", token);

        // Add token to the headers
        const response = await axios.get(`${apiUrl}/api/get-all`, {
          headers: {
            Authorization: `Bearer ${token}`, // Adding the token to Authorization header
          },
        });
        console.log("Full Response:", response);

        setVisions(response.data); // Assuming the API response contains the visions
      } catch (error) {
        console.error("Error fetching visions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisions();
  }, []);

  // Paginate the cards

  const updateTableData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/get-all`);
      setVisions(response.data); // Update the visions state with the new list
    } catch (error) {
      console.error("Error fetching updated visions:", error);
    }
  };
  return (
    <div>
      <body>
        <div className={`main-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
          {/*}  <SideNav />*/}
          <TopNav />

          <div
            class="page-wrapper"
            style={{ marginBottom: "100px", width: "80%", margin: "auto" }}
          >
            <div class="content">
              <div className="box-container">
                {/* First Box: All Subjects */}
                <div className="custom-box box-1">
                  <div className="box-icon">
                    <i
                      className="fas fa-book"
                      style={{ color: "white", fontSize: "50px" }}
                    ></i>{" "}
                    {/* Replace with a relevant icon */}
                  </div>
                  <h2 className="box-title">All Subjects</h2>
                  <p className="box-description">
                    Access past questions for all subjects and start practicing
                    today.
                  </p>
                  <button className="btn-vision">
                    <a style={{ color: "white", textDecoration: "none" }}>
                      <Link
                        to="/all-subject"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        View All Subjects
                      </Link>
                    </a>
                  </button>
                </div>

                {/* Second Box: Literary Texts */}
                <div className="custom-box box-2">
                  <div className="box-icon">
                    <i
                      className="fas fa-feather-alt"
                      style={{ color: "white", fontSize: "50px" }}
                    ></i>{" "}
                    {/* Replace with a relevant icon */}
                  </div>
                  <h2 className="box-title">Literary Texts</h2>
                  <p className="box-description">
                    Explore literary texts and related past questions to enhance
                    your study.
                  </p>
                  <button className="btn-template">
                    <a>Explore Literary Texts</a>
                  </button>
                </div>

                {/* Third Box: WAEC Resources */}
                <div className="custom-box box-3">
                  <div className="box-icon">
                    <i
                      className="fas fa-graduation-cap"
                      style={{ color: "white", fontSize: "50px" }}
                    ></i>{" "}
                    {/* Replace with a relevant icon */}
                  </div>
                  <h2 className="box-title">WAEC Resources</h2>
                  <p className="box-description">
                    Prepare for WAEC with curated resources and past questions.
                  </p>
                  <button className="btn-template">
                    <a>Get WAEC Resources</a>
                  </button>
                </div>

                {/* Fourth Box: JAMB Resources */}
                <div className="custom-box box-4">
                  <div className="box-icon">
                    <i
                      className="fas fa-university"
                      style={{ color: "white", fontSize: "50px" }}
                    ></i>{" "}
                    {/* Replace with a relevant icon */}
                  </div>
                  <h2 className="box-title">JAMB Resources</h2>
                  <p className="box-description">
                    Ace your JAMB exams with the best past questions and study
                    guides.
                  </p>
                  <button className="btn-vision">
                    <a>Get JAMB Resources</a>
                  </button>
                </div>
              </div>

              <div className="vision-board">
                {loading ? (
                  <p>Loading...</p>
                ) : visions.length === 0 ? (
                  <div className="text-center">
                    <p>There is nothing yet on your vision board.</p>
                    <button
                      className="btn btn-primary"
                      // onClick={handleCreateVision}
                      onClick={() => setShowModal(true)}
                    >
                      Create Vision
                    </button>
                  </div>
                ) : (
                  <div className="row">
                    {visions.map((vision, index) => (
                      <div
                        key={vision.id}
                        className="col-xl-3 col-sm-6 col-12"
                        style={{ marginBottom: "20px" }}
                      >
                        <div className="card h-100 text-white border-0">
                          <img
                            src={vision.imageUrl || "default-image.jpg"} // Fallback image
                            alt="Card Image"
                            className="card-img-top img-fluid"
                            style={{ objectFit: "cover" }}
                          />
                          <div className="card-body">
                            {/*}   <h3 className="card-title">#{index + 1}</h3>*/}
                            <h3
                              className="card-title"
                              style={{ color: "black" }}
                            >
                              <Link
                                to={`/vision-idea/${encodeURIComponent(
                                  vision.title
                                )}`}
                              >
                                {vision.title}
                              </Link>
                            </h3>
                          </div>
                          {/* Edit and Delete Icons */}
                          <div
                            className="card-icons"
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              display: "none",

                              gap: "10px",
                            }}
                          >
                            <button
                              style={{
                                padding: "8px",
                                fontSize: "16px",
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                              title="Edit"
                            >
                              <FaEdit style={{ color: "#28a745" }} />
                            </button>
                            <button
                              style={{
                                padding: "8px",
                                fontSize: "16px",
                                backgroundColor: "#fff",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                              title="Delete"
                            >
                              <FaTrash style={{ color: "#dc3545" }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Dashboard;
