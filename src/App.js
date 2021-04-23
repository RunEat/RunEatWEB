import './App.css';
import { Route, Switch } from 'react-router';
import { useEffect, useState } from 'react';

import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Activate from './components/signup/Activate'
import CheckEmail from './components/signup/CheckEmail'
import Profile from './components/Profile/Profile';
import Diary from './components/Diary/Diary'
import Meal from './components/Meal/Meal'
import Sport from './components/Sport/Sport'

import { getAccessToken } from './store/AccessTokenStore';
import { getUserInfo } from './services/UserService'


function App() {
  // const [user, setUser] = useState(null);

  // const getUser = () => {
  //   return getUserInfo().then((response) => setUser(response));
  // };

  // useEffect(() => {
  //   if (getAccessToken()) {
  //     getUser();
  //   }
  // }, []);
  
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/checkEmail' component={CheckEmail}/>
        <Route exact path='/user/activate/:token' component={Activate} />
        {/* <Route exact path='/login' render={() => <Login doLogin={getUser} />} /> */}
        <Route exact path='/login' component={Login}/>
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/diary' component={Diary} />
        <Route exact path='/meal' component={Meal} />
        <Route exact path='/sport' component={Sport} />
      </Switch>
    </div>
  );
}

export default App;
