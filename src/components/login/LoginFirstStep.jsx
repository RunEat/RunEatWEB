import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import "./LoginFirstStep.css";

function LoginFirstStep(props) {
  return (
    <div className="LoginFirstStep">
      <Link to="/">
        <i className="fas fa-chevron-left ms-4 mt-5 mb-5 colorLink"></i>
      </Link>
      <div className="d-flex flex-column justify-content-between align-items-center mt-5 heightLoginFirstStep">
        <div className="d-flex flex-column text-center align-items-center">
          <h1>Welcome back!</h1>
          <h1>It's good to see you again</h1>
          <GoogleAuth />
          <Link
            to="/login"
            className="btn btn-light w-100 py-2 mt-4 LoginButton"
            style={{ borderRadius: "5rem", color: "#000", paddingLeft: '2rem', paddingRight: '3rem'}}
          >
            <img
              className="loginIcon me-3"
              src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PHBhdGggZD0ibTUwNCAxNzguNzN2MzI1LjI3aC00OTZ2LTMyNS4yN2MxMzkuNjItMTAxLjQ5IDgzLjczLTYwLjY1IDIzOS4wNy0xNzUuNzggMi42NC0xLjk2IDUuNzctMi45NSA4LjkzLTIuOTUgMS41NyAwIDMuMTQuMjQgNC42NS43NC4zOC4xMi43NS4yNiAxLjEyLjQxLjM3LjE2LjczLjMyIDEuMDkuNTEuMzYuMTguNzEuMzggMS4wNS42LjM1LjIxLjY5LjQ0IDEuMDIuNjkgMTUyLjIzIDExMi44IDk2LjU4IDcyLjIzIDIzOS4wNyAxNzUuNzh6IiBmaWxsPSIjZmY3ZDQ3Ii8+PHBhdGggZD0ibTUwNCAxNzguNzN2MzI1LjI3aC0yNDh2LTUwNGMxLjU3IDAgMy4xNC4yNCA0LjY1Ljc0LjM4LjEyLjc1LjI2IDEuMTIuNDEuMzcuMTYuNzMuMzIgMS4wOS41MS4zNi4xOC43MS4zOCAxLjA1LjYuMzUuMjEuNjkuNDQgMS4wMi42OSAxNTIuMjMgMTEyLjggOTYuNTggNzIuMjMgMjM5LjA3IDE3NS43OHoiIGZpbGw9IiNmZjdkNDciLz48cGF0aCBkPSJtMzk5IDE1djM1M2MwIDguMjgtNi43MiAxNS0xNSAxNWgtMjU2Yy04LjI4IDAtMTUtNi43Mi0xNS0xNXYtMzUzYzAtOC4yOCA2LjcyLTE1IDE1LTE1aDI1NmM4LjI4IDAgMTUgNi43MiAxNSAxNXoiIGZpbGw9IiNlZWY0ZmYiLz48cGF0aCBkPSJtMzk5IDE1djM1M2MwIDguMjgtNi43MiAxNS0xNSAxNWgtMTI4di0zODNoMTI4YzguMjggMCAxNSA2LjcyIDE1IDE1eiIgZmlsbD0iI2Q5ZTZmYyIvPjxwYXRoIGQ9Im0yMzIuMTQzIDMzMS45LTIwOC4zLTE1Mi4wMTdjLTQuNTYxLTMuMzI5LTEwLjYwNC0zLjgxNC0xNS42MzktMS4yNTYtNS4wMzMgMi41NTktOC4yMDQgNy43MjctOC4yMDQgMTMuMzczdjMwNWMwIDguMzI2IDYuNzY3IDE1IDE0Ljk5OCAxNSAzLjEzOCAwIDYuMjU3LS45ODMgOC44ODEtMi45MWwyMDguMy0xNTIuOTgzYzguMTQ2LTUuOTg0IDguMTc5LTE4LjIxMS0uMDM2LTI0LjIwN3oiIGZpbGw9IiNmZmUyNzgiLz48cGF0aCBkPSJtNTAzLjc5NiAxNzguNjI4Yy01LjAzMy0yLjU1OS0xMS4wNzctMi4wNzItMTUuNjM5IDEuMjU2bC0yMDguMyAxNTIuMDE2Yy04LjE2NCA1Ljk1OC04LjIzNCAxOC4xODUtLjAzNiAyNC4yMDZsMjA4LjMgMTUyLjk4M2MyLjYyNCAxLjkyNyA1Ljc0MyAyLjkxIDguODgxIDIuOTEgOC4yMzMgMCAxNC45OTgtNi42NzYgMTQuOTk4LTE1di0zMDQuOTk5YzAtNS42NDYtMy4xNzEtMTAuODE0LTguMjA0LTEzLjM3MnoiIGZpbGw9IiNmZmI0NTQiLz48cGF0aCBkPSJtLjc1IDUwMS42N2MyLjAyIDYuMTYgNy43NyAxMC4zMyAxNC4yNSAxMC4zM2g0ODJjNi40OCAwIDEyLjIzLTQuMTcgMTQuMjUtMTAuMzNzLS4xNC0xMi45Mi01LjM3LTE2Ljc2bC0yNDEtMTc3Yy01LjI4LTMuODgtMTIuNDgtMy44OC0xNy43NiAwbC0yNDEgMTc3Yy01LjIzIDMuODQtNy4zOSAxMC42LTUuMzcgMTYuNzZ6IiBmaWxsPSIjZmY5ZDIxIi8+PHBhdGggZD0ibS43NSA1MDEuNjdjMi4wMiA2LjE2IDcuNzcgMTAuMzMgMTQuMjUgMTAuMzNoMjQxdi0yMDdjLTMuMTIgMC02LjI0Ljk3LTguODggMi45MWwtMjQxIDE3N2MtNS4yMyAzLjg0LTcuMzkgMTAuNi01LjM3IDE2Ljc2eiIgZmlsbD0iI2ZmYjQ1NCIvPjwvZz48L3N2Zz4="
              alt="LoginIcon"
            />
            Continue with Username
          </Link>
        </div>
        <div className="mb-3 text-center fs-6 w-75">
          By continuing, you agree to RunEat's{" "}
          <span className="colorLink">Terms & Conditions</span> and
          <span className="colorLink"> Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
}

export default LoginFirstStep;
