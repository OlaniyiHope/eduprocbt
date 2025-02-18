import { React, useEffect, useState } from "react";
// import useFetch from "hooks/useFetch";

import { FaAngleDoubleLeft } from "react-icons/fa"; // Use this for double chevrons
import { FaSearch } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FaEllipsisV } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import "./TopNav.css";
import { FiHelpCircle } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { useSidebar } from "./SidebarProvider";

const TopNav = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const { toggleSidebar } = useSidebar();
  const { toggleSidebar, isSidebarOpen } = useSidebar();

  const { user } = useAuth(); // Access the authenticated user
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };
  // const isValidToken = (jwtToken) => {
  //   try {
  //     const payload = JSON.parse(atob(jwtToken.split(".")[1])); // Decode JWT token payload
  //     const expiration = payload.exp * 1000; // Convert expiration to milliseconds
  //     return expiration > Date.now(); // Check if the token is still valid
  //   } catch (error) {
  //     return false; // If there's an error (e.g., token is malformed), consider it invalid
  //   }
  // };
  const isValidToken = (jwtToken) => {
    try {
      const payload = JSON.parse(atob(jwtToken.split(".")[1])); // Decode JWT token payload
      const expiration = payload.exp * 1000; // Convert expiration to milliseconds

      return expiration > Date.now(); // Check if the token is still valid
    } catch (error) {
      return false; // If there's an error (e.g., token is malformed), consider it invalid
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");

        if (jwtToken && isValidToken(jwtToken)) {
          const response = await axios.get(`${apiUrl}/api/profile`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });

          const { user } = response.data;
        }
      } catch (error) {}
    })();
  }, [apiUrl]);

  useEffect(() => {}, [user]);

  return (
    <body>
      <div class="main-wrapper " style={{ height: "80px" }}>
        <div class="header shadowss">
          <div class="header-left active">
            {/*} <a
              // href="https://dreamspos.dreamstechnologies.com/html/template/index.html"
              class="logo logo-normal"
            >
              <img
                src={logo}
                alt
                style={{
                  width: "300px",
                  height: "300px",
                  paddingTop: "40px",
                }}
              />
            </a>
            <a
              // href="https://dreamspos.dreamstechnologies.com/html/template/index.html"
              class="logo logo-white"
            >
              <img
                src={logo}
                alt
                style={{
                  width: "300px",
                  height: "300px",
                  paddingTop: "40px",
                }}
              />
            </a>
            <a
              href="https://dreamspos.dreamstechnologies.com/html/template/index.html"
              class="logo-small"
            >
              <img
                src={logo}
                alt
                style={{
                  width: "300px",
                  height: "300px",
                  paddingTop: "40px",
                }}
              />
            </a>*/}

            <p>
              <a
                style={{ fontWeight: "700", fontSize: "30px", color: "black" }}
              >
                DreamSimu
              </a>
            </p>
            {/*}   <a
              id="toggle_btn"
              href="javascript:void(0);"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? (
                <FaChevronLeft className="chevron-icon" />
              ) : (
                <FaChevronRight className="chevron-icon" />
              )}
            </a>*/}
          </div>

          <a id="mobile_btn" className="mobile_btn" onClick={toggleSidebar}>
            <span class="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>

          <ul class="nav user-menu">
            {/*} <li
                style={{
                  marginLeft: "40px",
                  fontWeight: "800",
                  paddingTop: "10px",
                }}
              >
                Admin Dashboard
              </li>*/}
            <li class="nav-item nav-searchinputs">
              <div class="top-nav-search">
                <a href="javascript:void(0);" class="responsive-search">
                  <FaSearch className="search-icon" />
                </a>
                <form action="#" class="dropdown">
                  <div
                    class="searchinputs dropdown-toggle"
                    id="dropdownMenuClickable"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="false"
                  >
                    <input type="text" placeholder="Search" />
                    <div class="search-addon">
                      <span>
                        <FiXCircle className="x-circle-icon" />
                      </span>
                    </div>
                  </div>
                  <div
                    class="dropdown-menu search-dropdown"
                    aria-labelledby="dropdownMenuClickable"
                  >
                    <div class="search-info">
                      <h6>
                        <span>
                          <FaSearch className="search-icon" />
                        </span>
                        Recent Searches
                      </h6>
                      <ul class="search-tags">
                        <li>
                          <a href="javascript:void(0);">Products</a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">Sales</a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">Applications</a>
                        </li>
                      </ul>
                    </div>
                    <div class="search-info">
                      <h6>
                        <span>
                          <FiHelpCircle className="help-circle-icon" />
                        </span>
                        Help
                      </h6>
                      <p>
                        How to Change Product Volume from 0 to 200 on Inventory
                        management
                      </p>
                      <p>Change Product Name</p>
                    </div>
                    <div class="search-info">
                      <h6>
                        <span>
                          <FiUser className="user-icon" />
                        </span>
                        Customers
                      </h6>
                      <ul class="customers">
                        <li>
                          <a href="javascript:void(0);">
                            Aron Varu
                            <img
                              src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/profiles/avator1.jpg"
                              alt
                              class="img-fluid"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Jonita
                            <img
                              src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/profiles/avatar-01.jpg"
                              alt
                              class="img-fluid"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            Aaron
                            <img
                              src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/profiles/avatar-10.jpg"
                              alt
                              class="img-fluid"
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            <li style={{ fontSize: "16px" }}>
              <p>Brain Dump</p>
            </li>
            <li style={{ fontSize: "16px" }}>
              <p>Refinement</p>
            </li>
            <li style={{ fontSize: "16px" }}>
              <p>Sprint</p>
            </li>
            <li style={{ fontSize: "16px" }}>
              <p>Retrospective</p>
            </li>
            <li class="nav-item dropdown nav-item-box">
              <a
                href="javascript:void(0);"
                class="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <FiBell className="bell-icon" />

                <span class="badge rounded-pill">2</span>
              </a>
              <div class="dropdown-menu notifications">
                <div class="topnav-dropdown-header">
                  <span class="notification-title">Notifications</span>
                  <a href="javascript:void(0)" class="clear-noti">
                    {" "}
                    Clear All{" "}
                  </a>
                </div>
                <div class="noti-content">
                  <ul class="notification-list">
                    <li class="notification-message">
                      <a>
                        <div class="media d-flex">
                          <div class="media-body flex-grow-1">
                            <p class="noti-details">
                              <span class="noti-title">Oga Pos Limited</span>{" "}
                              added new task{" "}
                              <span class="noti-title">
                                Create new transaction
                              </span>
                            </p>
                            <p class="noti-time">
                              <span class="notification-time">4 mins ago</span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="topnav-dropdown-footer">
                  <a>View all Notifications</a>
                </div>
              </div>
            </li>

            <li class="nav-item nav-item-box">
              <a>
                <FiSettings className="settings-icon" />
              </a>
            </li>

            {/*<li className="nav-item nav-item-box">
              <a>
                <FiUser className="profile-icon" />
              </a>
            </li>*/}

            <li
              className="nav-item dropdown has-arrow nav-item-box main-drop"
              style={{ zIndex: "1000" }}
            >
              <a
                href="javascript:void(0);"
                className="dropdown-toggle nav-link userset"
                data-bs-toggle="dropdown"
              >
                <FiUser className="profile-icon" />
                {/* Profile Icon */}
              </a>
              <div class="dropdown-menu menu-drop-user">
                <div class="profilename">
                  <div class="profileset">
                    <div class="profilesets">
                      <h6> {user?.username}</h6>
                      <h5> {user?.role}</h5>
                    </div>
                  </div>
                  <hr class="m-0" />
                  <a class="dropdown-item" href="/profile">
                    {" "}
                    <FiUser className="me-2" /> My Profile
                  </a>
                  <a class="dropdown-item" href="/settings">
                    <FiSettings className="me-2" />
                    Settings
                  </a>
                  <hr class="m-0" />
                  <a class="dropdown-item logout pb-0" href="/login">
                    <img
                      src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/log-out.svg"
                      class="me-2"
                      alt="img"
                    />
                    Logout
                  </a>
                </div>
              </div>
            </li>
          </ul>

          <div class="dropdown mobile-user-menu nav-item-box">
            <a
              href="javascript:void(0);"
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FiUser className="profile-icon" />
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="/profile">
                My Profile
              </a>
              <a class="dropdown-item" href="/settings">
                Settings
              </a>
              <a class="dropdown-item" href="/login">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default TopNav;
