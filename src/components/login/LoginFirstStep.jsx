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
          <GoogleAuth/>
            {/* <button
              className="btn btn-light mx-1 w-100 mt-5 LoginButton"
              style={{ borderRadius: "5rem", color: "#000" }}
            >
              <img
                className="loginIcon me-3"
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGQkJCMDA7IiBkPSJNMTEzLjQ3LDMwOS40MDhMOTUuNjQ4LDM3NS45NGwtNjUuMTM5LDEuMzc4QzExLjA0MiwzNDEuMjExLDAsMjk5LjksMCwyNTYNCgljMC00Mi40NTEsMTAuMzI0LTgyLjQ4MywyOC42MjQtMTE3LjczMmgwLjAxNGw1Ny45OTIsMTAuNjMybDI1LjQwNCw1Ny42NDRjLTUuMzE3LDE1LjUwMS04LjIxNSwzMi4xNDEtOC4yMTUsNDkuNDU2DQoJQzEwMy44MjEsMjc0Ljc5MiwxMDcuMjI1LDI5Mi43OTcsMTEzLjQ3LDMwOS40MDh6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojNTE4RUY4OyIgZD0iTTUwNy41MjcsMjA4LjE3NkM1MTAuNDY3LDIyMy42NjIsNTEyLDIzOS42NTUsNTEyLDI1NmMwLDE4LjMyOC0xLjkyNywzNi4yMDYtNS41OTgsNTMuNDUxDQoJYy0xMi40NjIsNTguNjgzLTQ1LjAyNSwxMDkuOTI1LTkwLjEzNCwxNDYuMTg3bC0wLjAxNC0wLjAxNGwtNzMuMDQ0LTMuNzI3bC0xMC4zMzgtNjQuNTM1DQoJYzI5LjkzMi0xNy41NTQsNTMuMzI0LTQ1LjAyNSw2NS42NDYtNzcuOTExaC0xMzYuODlWMjA4LjE3NmgxMzguODg3TDUwNy41MjcsMjA4LjE3Nkw1MDcuNTI3LDIwOC4xNzZ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMjhCNDQ2OyIgZD0iTTQxNi4yNTMsNDU1LjYyNGwwLjAxNCwwLjAxNEMzNzIuMzk2LDQ5MC45MDEsMzE2LjY2Niw1MTIsMjU2LDUxMg0KCWMtOTcuNDkxLDAtMTgyLjI1Mi01NC40OTEtMjI1LjQ5MS0xMzQuNjgxbDgyLjk2MS02Ny45MWMyMS42MTksNTcuNjk4LDc3LjI3OCw5OC43NzEsMTQyLjUzLDk4Ljc3MQ0KCWMyOC4wNDcsMCw1NC4zMjMtNy41ODIsNzYuODctMjAuODE4TDQxNi4yNTMsNDU1LjYyNHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGMTQzMzY7IiBkPSJNNDE5LjQwNCw1OC45MzZsLTgyLjkzMyw2Ny44OTZjLTIzLjMzNS0xNC41ODYtNTAuOTE5LTIzLjAxMi04MC40NzEtMjMuMDEyDQoJYy02Ni43MjksMC0xMjMuNDI5LDQyLjk1Ny0xNDMuOTY1LDEwMi43MjRsLTgzLjM5Ny02OC4yNzZoLTAuMDE0QzcxLjIzLDU2LjEyMywxNTcuMDYsMCwyNTYsMA0KCUMzMTguMTE1LDAsMzc1LjA2OCwyMi4xMjYsNDE5LjQwNCw1OC45MzZ6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
                alt="GoogleIcon"
              />
              Continue with Google
            </button>
          </GoogleAuth> */}
          <Link
            to="/login"
            className="btn btn-light mx-1 w-100 mt-4 LoginButton"
            style={{ borderRadius: "5rem", color: "#000" }}
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
