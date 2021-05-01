import React, { useState } from "react";
import { useUser } from "../../hooks/useUserContext";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './Profile.css'

function Profile() {
  const [showBody, setShowBody] = useState(false);

  const [showSettings, setShowSettings] = useState(false);

  const { user } = useUser();

  const showBodyF = () => {
    setShowBody(!showBody);
  };

  const showSettingsF = () => {
    setShowSettings(!showSettings);
  };

  return !user ? (
    "Error - Unauthorized"
  ) : !user.avatar ? (
    <Redirect to="/profile/edit" />
  ) : (
    <div
      className="Profile container mt-3"
      style={{ maxHeight: "85vh", overflow: "scroll" }}
    >
      {user ? (
        <>
            <img
              src='./images/cover.jpeg'
              className="cover"
              alt={user.username}
            />
            <img
              src={user.avatar}
              className="imageProfile"
              alt={user.username}
              />
              
          <div className="InfoProfile text-center border border-2 border-light p-3">
            <h2>{user.username}</h2>
            <p>Activity level · {user.activity}</p>
          </div>

          <div className="d-flex justify-content-around align-items-center mt-4 border border-2 border-light p-4">
            <div className="InfoBody">
              <button
                onClick={showBodyF}
                className="px-3 py-2 border h-50"
                style={{
                  backgroundColor: "#ff9d20",
                  width: "6rem",
                  borderRadius: "1rem",
                }}
              >
                <i
                  className="fas fa-male"
                  style={{ color: "#fff", fontSize: "1.5rem" }}
                ></i>
                <span style={{ color: "#fff" }}>Measures</span>
              </button>
            </div>

            <div className="Settings">
              <button
                onClick={showSettingsF}
                className="px-3 py-2 border h-50"
                style={{
                  backgroundColor: "#ff9d20",
                  width: "6rem",
                  borderRadius: "1rem",
                }}
              >
                <i
                  class="fas fa-user-cog"
                  style={{ color: "#fff", fontSize: "1.5rem" }}
                ></i>
                <span style={{ color: "#fff" }}>Settings</span>
              </button>
            </div>
          </div>

          {showBody && (
            <div className="d-flex justify-content-around align-items-center mt-3 border border-2 border-light p-5">
              <p className="card-text">Age: {user.age}</p>
              <p className="card-text">Height: {user.height}</p>
              <p className="card-text">Weight: {user.weight}</p>
            </div>
          )}
          {showSettings && (
            <div className="d-flex justify-content-around align-items-center mt-3 border border-2 border-light p-5">
              <p className="card-text">Age: {user.age}</p>
              <p className="card-text">Email: {user.email}</p>
              <Link to="/profile/edit" className="btn btn-primary">
                Edit Profile
              </Link>
              <Link to="/profile/delete" className="btn btn-primary">
                Delete Account
              </Link>
            </div>
          )}

          <Navbar />
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default Profile;
