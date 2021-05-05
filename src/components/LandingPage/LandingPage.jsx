import React from 'react';
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="LandingPage">
    <div className="text-dark d-flex flex-column text-center">
      <h4 className="mb-0 pb-0 mt-2">Welcome to</h4>
      <h1 className="font-weitght-bold mt-0 p-0">RunEat</h1>
      <h3>Healthy living simplified</h3>
    </div>
    <div className="container text-dark d-flex align-items-center justify-content-between">
      <div className="text-dark d-flex flex-column text-center">
        <h2 className="mt-4">Install RunEat in 3 <u>easy steps</u></h2>
        <br/>
        <h3>Step 1</h3>
        <p>Scan the QR code or go to <a href="https://www.runeat.herokuapp.com" target="_blank">runeat.herokuapp.com</a> <br/>on your smartphone</p>
        <br/>
        <h3>Step 2</h3>
        <p>Go to settings</p>
        <br/>
        <h3>Step 3</h3>
        <p>Select <em>Add to home screen</em></p>
      </div>
      <div className="d-flex justify-content-center col-4">
        <img 
          className="text-dark d-flex flex-column w-100" 
          src="../../../images/QR-RunEat.png"
          />
      </div>
    </div>
    </div>
  );
};

export default LandingPage;