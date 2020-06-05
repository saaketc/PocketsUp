import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

import MediaCard from "../components/ui/mediaCard";
import { getData } from "../services/dataServices";
import colors from "../config/colors";
import { createSlug } from '../utils/generalFunctions';
import exploreIllus from '../illustrations/explore.svg';
import loveIllus from '../illustrations/fund.svg';
import createIllus from '../illustrations/build.svg'

const useStyles = makeStyles((theme) => ({
  btn: {
    color: colors.white,
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.primary,
    "&:hover": {
      backgroundColor: colors.primary,
    },
  },
  title: {
    fontWeight: "900",
    color: colors.primary,
  },
  description: {
    fontWeight: "700",
    color: colors.primary,
  },
  topSpace: {
    marginTop: '30px'
  },
  left: {
    marginLeft:0
  },
  right: {
    marginRight:0
  }
}));

const descriptions = [
  {text: 'Explore creative projects', illustration: exploreIllus},
  {text: 'Fund campaigns you love & get exclusive perks', illustration: loveIllus},
  {text: 'Create campaigns & raise funds for your creative works', illustration: createIllus}
]
const Welcome = () => {
  const history = useHistory();
  const [campaigns, setCampaigns] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const { data } = await getData(`campaign/`);
      setCampaigns(data);
    };
    fetchCampaigns();
  }, []);

  const handleAuthClick = () => {
    return history.push("/auth/signup");
  };
  const handleCampaignClick = (campaign) => {
    return history.push(`/campaign/${createSlug(campaign.title)}?space=${campaign._id}`);
  }
  return (
    <Container style={{ textAlign: "center" }}>
      <br />
      <br />
      <br />
      <br />
      <Hidden only={["xs", "s"]}>
        <Typography variant="h1" className={classes.title}>
          Bring creativity to life <br /> with PocketsUp.
        </Typography>
      </Hidden>
      <Hidden only={["lg", "s", "md"]}>
        <Typography variant="h3" className={classes.title}>
          Bring creativity to life <br /> with PocketsUp.
        </Typography>
      </Hidden>
      <br />
      <Typography variant="h6">
        Fund creative projects and need based campaigns even with your pocket money (Isn't that cool!), <br />
        create a campaign for your creative project.
        <br />
        Try now and get exciting rewards from the campaigns.
      </Typography>
      <br />
      <Button onClick={handleAuthClick} className={classes.btn}>
        Get started
      </Button>
      <br />
      <br />
      <br />
      <Typography className={classes.description} variant='h3'>
       Featured
      </Typography>
      <br/>
      <br/>
      <Grid container spacing={4}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} md={4} lg={4}>
            <MediaCard
              data={campaign}
              primaryProperty="title"
              secProperty="description"
              message1={campaign.status}
              tag={campaign.type === 'p' ? 'For profit' : 'Not for profit'}
              url={campaign.mediaUrl}
              onClick={handleCampaignClick}
            />
          </Grid>
        ))}
      </Grid>
      <br/>
      <br/>
      <Typography className={classes.description} variant='h3'>
        Why PocketsUp?
      </Typography>
      <br/>
      <Grid container spacing={6} className={classes.topSpace}>
        {
          descriptions.map(d => (
            <Grid item xs={12} md={4} lg={4}>
             <Typography className={classes.description}variant='h5'>
          {d.text}
            </Typography>
        <br/>
        <img className={classes.left} src={d.illustration} alt='explore'/> 
            </Grid>
          ))
     }
      </Grid>
    </Container>
  );
};

export default Welcome;
