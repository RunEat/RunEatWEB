import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="LandingPage pb-5 pe-5 ps-5 pt-5">
      <div className="text-dark d-flex text-center justify-content-between">
        <h1 className="font-weitght-bold mt-0 p-0 RunEat">RunEat</h1>
        <div>
          <Link
            to="/Login"
            className="me-3 fs-3 text-decoration-none text-dark"
          >
            LOG IN
          </Link>
          <Link
            to="/Signup"
            className="me-3 fs-3 text-decoration-none borderR py-2 px-4"
          >
            Sign up
          </Link>
        </div>
      </div>
      <div className="container text-dark d-flex align-items-center justify-content-between pb-5 mt-5">
        <div className="text-dark d-flex flex-column text-center pb-5">
          <h2 className="title mt-4 w-75 greenColor">
            Healthy living. Simplified.
          </h2>
          <p className="fs-2 text-start">
            The digital self-care app that helps you reach your health and
            weight goals through better eating.
          </p>
        </div>
        <div className="d-flex justify-content-center col-4 pb-5">
          <img className="w-100" src="../../../images/iphone.png" />
        </div>
      </div>
      <div className="text-dark d-flex flex-column text-center pb-5">
        <hr className="w-50 align-self-center"/>
        <h2 className="install-text my-5">
          Install RunEat in 3 <u>easy steps</u>
        </h2>
        <h3 className="mt-4">
          IPHONE{" "}
          <img
            className="ms-3 iconMobile"
            src="../../../images/AppleIcon.png"
          />
        </h3>
        <br />
        <div className="d-flex justify-content-around">
          <section>
            <h3>
              <img className="w-25" src="../../../images/one.png" />
            </h3>
            <p className="step">
              Scan the QR code or go to{" "}
              <a href="https://www.runeat.herokuapp.com" target="_blank">
                runeat.herokuapp.com
              </a>{" "}
              <br />
              on your smartphone
            </p>
            <img className="w-50" src="../../../images/Iphone1.png" />
          </section>
          <section>
            <h3>
              <img className="w-25" src="../../../images/two.png" />
            </h3>
            <p className="step">Go to settings</p>
            <img className="w-50" src="../../../images/Iphone3.png" />
          </section>
          <section>
            <h3>
              <img className="w-25" src="../../../images/three.png" />
            </h3>
            <p className="step">
              Select <em>Add to home screen</em>
            </p>
            <img className="w-50" src="../../../images/Iphone2.png" />
          </section>
        </div>
      </div>

      <div className="text-dark d-flex flex-column text-center pb-5">
        <h3 className="mt-4">
          ANDROID{" "}
          <img className="iconMobile" src="../../../images/AndroidIcon.png" />
        </h3>
        <br />
        <div className="d-flex justify-content-around">
          <section>
            <h3>
              <img className="w-25" src="../../../images/one.png" />
            </h3>
            <p className="step">
              Scan the QR code or go to{" "}
              <a href="https://www.runeat.herokuapp.com" target="_blank">
                runeat.herokuapp.com
              </a>{" "}
              <br />
              on your smartphone
            </p>
            <img className="w-50" src="../../../images/Android1.png" />
          </section>
          <section>
            <h3>
              <img className="w-25" src="../../../images/two.png" />
            </h3>
            <p className="step">Go to settings</p>
            <img className="w-50" src="../../../images/Android2.png" />
          </section>
          <section>
            <h3>
              <img className="w-25" src="../../../images/three.png" />
            </h3>
            <p className="step">
              Select <em>Add to home screen</em>
            </p>
            <img className="w-50" src="../../../images/Android3.png" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;