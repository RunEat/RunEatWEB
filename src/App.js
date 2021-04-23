import './App.css';
import { Route, Switch } from 'react-router';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Activate from './components/signup/Activate'
import CheckEmail from './components/signup/CheckEmail'
import { useEffect, useState } from 'react';
import { getAccessToken } from './store/AccessTokenStore';
import { getUserInfo } from './services/UserService'
import Profile from './components/Profile/Profile';


function App() {
  const [user, setUser] = useState(null);

  const getUser = () => {
    return getUserInfo().then((response) => setUser(response));
  };

  useEffect(() => {
    if (getAccessToken()) {
      getUser();
    }
  }, []);
  
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/checkEmail' component={CheckEmail}/>
        <Route exact path='/user/activate/:token' component={Activate} />
        <Route exact path='/login' render={() => <Login doLogin={getUser} />} />
        <Route exact path='/profile' component={Profile}/>
      </Switch>
    </div>
  );
}

export default App;
