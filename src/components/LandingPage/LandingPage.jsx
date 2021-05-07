import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <>
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
          <hr className="w-50 align-self-center" />
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
                <Link to="https://www.runeat.herokuapp.com">
                  <span className="greenColor non-decoration">
                    runeat.herokuapp.com
                  </span>
                </Link>
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

        <section className="py-5 text-center">
          <div className="container">
            <hr className="w-50 align-self-center" />
            <h2 className="py-5 greenColor">AS SEEN IN</h2>
            <div class="row">
              <div className="col-12 col-md-6 col-lg-4">
                <img className="w-50" src="../../../images/publi1.png" alt="" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <img className="w-50" src="../../../images/publi2.png" alt="" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <img className="w-50" src="../../../images/publi3.png" alt="" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <img className="w-50" src="../../../images/publi4.png" alt="" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <img className="w-50" src="../../../images/publi5.png" alt="" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <img className="w-25" src="../../../images/publi6.png" alt="" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <section id="footer" className="container-fluid bg-light py-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-2 col-lg-4">
                <h1 className="RunEat mt-3">RunEat</h1>
              </div>

              <div className="col-6 col-md-2 mt-3">
                <h5 className="ms-4 greenColor">COMPANY</h5>
                <ul>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      About us
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Carrers
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-md-2 mt-3">
                <h5 className="ms-4 greenColor">PRODUCTS</h5>
                <ul>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Why RunEat?
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Running
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Healthy foods
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Healthy life
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Security
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-md-2 mt-3">
                <h5 className="ms-4 greenColor">RESOURCES</h5>
                <ul>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Download
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Help center
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Guide
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Events
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Directories
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      API
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-md-2 mt-3">
                <h5 className="ms-4 greenColor">ADDITIONAL FEATURES</h5>
                <ul>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Podcast
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Tienda hireHack
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      hireHack en el trabajo
                    </Link>
                  </li>
                  <li className="listStyle mb-2">
                    <Link className="non-decoration" to="#">
                      Fundación hireHack
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-light">
          <section className="d-flex pb-4 ms-3">
            <Link className="non-decoration text-dark" to="#">
              Terms and Conditions
            </Link>

            <Link className="non-decoration text-dark ms-4" to="#">
              Contact us
            </Link>
          </section>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
