import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import TopNav from "./TopNav";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import "swiper/css/navigation";
import "./admin.css";
import { useSidebar } from "./SidebarProvider";
import useAuth from "../hooks/useAuth";
import TopNavs from "./TopNavs";
import pro1 from "./pro.JPG";
import pro2 from "./pro.JPG";
import pro3 from "./pro.JPG";
const Dashboard = () => {
  const { user } = useAuth(); // Access the authenticated user
  const [points, setPoints] = useState([]);
  const { isSidebarOpen } = useSidebar(); // use context to get sidebar state
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
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

  const boxColors = [
    "#dc3545", // Red
    "#0d3978", // Dark Blue
    "#007bff", // Blue
    "#28a745", // Green
    "#ffc107", // Yellow
    "#6610f2", // Purple
    "#17a2b8", // Teal
    "#fd7e14", // Orange
    "#6c757d", // Gray
  ];
  const handleClick = (title) => {
    if (title === "Practice for UTME") {
      navigate("/practice-for-utme"); // Adjust the route as needed
    }
  };

  return (
    <div>
      <body>
        <div className={`main-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
          {/*}  <SideNav />*/}
          <TopNav />

          <div class="page-wrapper hope">
            <div class="content">
              <div className="main-container">
                {/* Left Section - Boxes (50%) */}
                <div className="left-section">
                  <div className="box-container">
                    {[
                      {
                        icon: "fas fa-book",
                        title: "Practice for UTME",
                        path: "/practice-for-utme",
                      },
                      { icon: "fas fa-feather-alt", title: "Literary Texts" },
                      {
                        icon: "fas fa-graduation-cap",
                        title: "WAEC Resources",
                      },
                      { icon: "fas fa-university", title: "JAMB Resources" },
                      { icon: "fas fa-chalkboard-teacher", title: "Tutorials" },
                      {
                        icon: "fas fa-microscope",
                        title: "Science Experiments",
                      },
                      { icon: "fas fa-globe", title: "General Knowledge" },
                      { icon: "fas fa-laptop-code", title: "Computer Science" },
                      {
                        icon: "fas fa-user-graduate",
                        title: "Scholarship Info",
                      },
                    ].map((item, index) => (
                      <div
                        className="custom-box"
                        key={index}
                        style={{
                          backgroundColor: boxColors[index % boxColors.length],
                          cursor: "pointer",
                        }}
                        onClick={() => handleClick(item.title)}
                      >
                        <div className="box-icon">
                          <i
                            className={item.icon}
                            style={{ color: "white", fontSize: "30px" }}
                          ></i>
                        </div>
                        <h4 className="box-title">{item.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>

                {/*} <div className="right-section">
                  <div className="carousel-container">
             
                    <img src={pro} alt="Carousel" className="carousel-image" />
                  </div>
                </div>*/}

                <div className="right-section">
                  <Swiper
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    loop={true}
                    className="carousel-container"
                  >
                    {[pro1, pro2, pro3].map((image, idx) => (
                      <SwiperSlide key={idx}>
                        <img
                          src={image}
                          alt={`Slide ${idx}`}
                          className="carousel-image"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Dashboard;
