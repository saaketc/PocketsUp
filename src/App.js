import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Container } from '@material-ui/core';
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from "react-router-dom";
import Welcome from "./components/welcome";
import Feed from "./components/feed";
import Navbar from "./components/navbar";
import CampaignPage from "./components/campaignPage";
import { getCurrentUser } from "./services/userServices";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import Checkout from "./components/checkout";

import colors from './config/colors';

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);
  return (
    <Container>
      <ToastContainer />
      <Navbar user={user} />
      <Switch>
        <Route path='/campaign/:campaignTitle' render={(props) => <CampaignPage {...props}/>}/>
        <Route path='/checkout' render={(props) => <Checkout {...props}/>}/>
        <Route  path="/auth/signup" component={Signup} />
        <Route  path="/auth/login" component={Login} />
        <Route  path="/logout" component={Logout} />
        <Route exact path="/" component={user? Feed : Welcome} />
      </Switch>
    </Container>
  );
}

export default App;
