import './App.css';
import { Route, Switch } from 'react-router';
// import { useEffect, useState } from 'react';
import Navbar from "./components/Navbar/Navbar";
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Activate from './components/signup/Activate'
import CheckEmail from './components/signup/CheckEmail'
import Profile from './components/Profile/Profile';
import ProfileForm from './components/Profile/ProfileForm'
import Diary from './components/Diary/Diary'
import Meal from './components/Meal/Meal'
import RecipeDetail from './components/Meal/Menu/RecipeDetail'
import Sport from './components/Sport/Sport'
import ChangePassword from './components/Profile/ChangePassword';
import LoginFirstStep from './components/login/LoginFirstStep'
import ConfirmToDelete from './components/Profile/ConfirmToDelete';
import SportDetail from './components/Sport/SportDetail';
import { GlowHubLoader } from 'react-glowhub';

// import { getAccessToken } from './store/AccessTokenStore';
// import { getUserInfo } from './services/UserService'

const App = () => {
  return (
    <div className="App">
      <GlowHubLoader 
        clientID="GH-9PI4NOH524O"
      />

      <Switch>
        <Route exact path="/recipe_detail/:id" component={RecipeDetail} />
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/checkEmail" component={CheckEmail} />
        <Route exact path="/user/activate/:token" component={Activate} />
        {/* <Route exact path='/login' render={() => <Login doLogin={getUser} />} /> */}
        <Route
          exact
          path="/user/password_reset/:token"
          component={ChangePassword}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/login-first" component={LoginFirstStep} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/edit" component={ProfileForm} />
        <Route exact path="/profile/delete" component={ConfirmToDelete} />
        <Route exact path="/diary" component={Diary} />
        <Route exact path="/meal" component={Meal} />
        <Route exact path="/sport" component={Sport} />
        <Route exact path="/sport-details" component={SportDetail} />
      </Switch>
    </div>
  );
}
export default App;
