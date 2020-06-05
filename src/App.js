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
import Footer from './components/footer';
import { makeStyles } from "@material-ui/core/styles";

import colors from './config/colors';
import CreateCampaign from "./components/campaignCreation/createCampaign";
import SearchResults from "./components/search/searchResults";
import Profile from "./components/profile";

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
  }
}));

function App() {
  const [user, setUser] = useState({});
  const classes = useStyles();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);
  return (
    <Container className={classes.background}>
      <ToastContainer />
      <Navbar user={user} />
      <Switch>
        <Route path='/campaign/:campaignTitle' render={(props) => <CampaignPage {...props}/>}/>
        <Route path='/profile' render={(props) => <Profile {...props} user={user}/>}/>
        <Route path='/create' render={(props) => <CreateCampaign {...props} user={user}/>}/>
        <Route  path="/search" component={SearchResults} />
        <Route path='/checkout' render={(props) => <Checkout {...props} user={user}/>}/>
        <Route  path="/auth/signup" component={Signup} />
        <Route  path="/auth/login" component={Login} />
        <Route  path="/logout" component={Logout} />
        <Route exact path="/" component={user? Feed : Welcome} />
      </Switch>
      <Footer
      />
    </Container>
  );
}

export default App;
