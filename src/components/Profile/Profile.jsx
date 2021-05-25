import React, { useState } from "react";
import { useUser } from "../../hooks/useUserContext";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../store/AccessTokenStore";
import { passwordResetEmail } from "../../services/AuthService";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";

function Profile() {
  const [showBody, setShowBody] = useState(false);

  const [showSettings, setShowSettings] = useState(false);

  const [changePasswordInfo, setChangePasswordInfo] = useState(false);

  const { user } = useUser();

  const showBodyF = () => {
    setShowBody(!showBody);
  };

  const showSettingsF = () => {
    setShowSettings(!showSettings);
  };

  const changePassword = (e) => {
    e.preventDefault();

    console.log("user", user.email);

    setChangePasswordInfo(true);
    setTimeout(() => {
      passwordResetEmail(user).then(() => {
        setChangePasswordInfo(false);
      });
    }, 5000);
  };

  return !user ? (
    // <div className="container text-center text-info mt-5">
    //   <img className="w-100" src="../../../images/non-found.jpeg" />
    //   <h2 className="mt-5">Error - Unauthorized</h2>
    // </div>
    <Redirect to="/login" />
  ) : !user.avatar ? (
    <Redirect to="/profile/edit" />
  ) : (
    <div className="Profile" style={{ maxHeight: "85vh", overflow: "scroll" }}>
      {user ? (
        <>
          <img
            src="https://source.unsplash.com/collection/1457950/1600x900"
            className="w-100"
            alt={user.username}
          />
          <img src={user.avatar} className="imageProfile" alt={user.username} />

          <div className="text-center border border-2 border-light me-2 ms-2 p-2">
            <h2>{user.username}</h2>
            <p>Activity level · {user.activity}</p>
            <p>Meal plan · {user.mealPlan}</p>
            <p>
              {user.age} years-old
              <i
                className="fas fa-birthday-cake fs-2 ms-2"
                style={{ color: "red" }}
              ></i>
            </p>
          </div>

          <div className="d-flex justify-content-around align-items-center mt-4 border border-2 border-light me-2 ms-2 p-2">
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
                  className="fas fa-user-cog"
                  style={{ color: "#fff", fontSize: "1.5rem" }}
                ></i>
                <span style={{ color: "#fff" }}>Settings</span>
              </button>
            </div>
          </div>

          {showBody && (
            <div className="d-flex flex-column justify-content-around align-items-center mt-3 border border-2 border-light p-2 me-2 ms-2">
              <div className="d-flex mt-3">
                <p className="card-text me-4">
                  <i
                    className="fas fa-ruler-vertical me-2 fs-1 align-items-center"
                    style={{ color: "#207dff" }}
                  ></i>
                  {user.height} cm
                </p>
                <p className="card-text">
                  <i
                    className="fas fa-weight me-2 fs-1"
                    style={{ color: "#207dff" }}
                  ></i>
                  {user.weight} Kg
                </p>
              </div>
            </div>
          )}
          {showSettings && (
            <div className="d-flex flex-column justify-content-around align-items-center mt-3 border border-2 border-light p-2 me-2 ms-2">
              <div>
                <h4 className="card-text">Email:</h4>
                <p>{user.email}</p>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center mt-3">
                <Link
                  to="/profile/edit"
                  className="btn btn-primary mt-2 btnStandar"
                >
                  <i className="fas fa-edit me-2" style={{ color: "#fff" }}></i>
                  Edit Profile
                </Link>
                <Link
                  to="/profile/delete"
                  className="btn btn-primary mt-2 btnStandar"
                >
                  <i
                    className="fas fa-trash-alt me-2"
                    style={{ color: "#fff" }}
                  ></i>
                  Delete Account
                </Link>
                <div className="d-grid gap-2 col-8 mx-auto mt-2">
                  <button
                    className="btn btn-primary btnChange btnStandar"
                    onClick={changePassword}
                  >
                    Update password
                  </button>
                  {changePasswordInfo && <p>Please, check your email!</p>}
                </div>
                <div
                  className="d-flex align-items-start mt-2"
                  style={{ color: "red" }}
                >
                  <button
                    className="btn btn-danger mx-1 btnStandar"
                    onClick={logout}
                  >
                    <i className="fas fa-power-off fs-4 me-2"></i>
                    Log out
                  </button>
                </div>
              </div>
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
