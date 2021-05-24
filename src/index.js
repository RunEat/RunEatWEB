import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LandingPage from './components/LandingPage/LandingPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { UserContextProvider } from "./contexts/UserContext"
import { DateContextProvider } from './contexts/DateContext';
import { DistanceContextProvider } from './contexts/DistanceContext';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <DateContextProvider>
          <DistanceContextProvider>
              <App className="App"/>
              <LandingPage className="LandingPage"/>
          </DistanceContextProvider>
        </DateContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
