import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MediaCard from "../components/ui/mediaCard";
import { getData } from "../services/dataServices";
import colors from "../config/colors";
import { createSlug } from '../utils/generalFunctions';

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
}));

const Feed = () => {
  const history = useHistory();
  const [campaigns, setCampaigns] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const { data } = await getData("campaign/");
      console.table(data);
      setCampaigns(data);
    };
    fetchCampaigns();
  }, []);

  const handleCampaignType = async (type) => {
    console.log(type);
    if (type === 'p') {
      try {
        const { data } = await getData('campaign/forProfit')
        console.log(data);
        setCampaigns(data);
      }
      catch (e) {
        console.log(e.message);
        
      }
      
    }
    else if (type === 'np') {
      try {
        const { data } = await getData('campaign/forNonProfit')
        console.log(data);
        setCampaigns(data);
        
      }
      catch (e) {
        console.log(e.message);
      }
    }
  };
  const handleCampaignClick = (campaign) => {
    return history.push(`campaign/${createSlug(campaign.title)}?space=${campaign._id}`);
  }
  return (
    <Container style={{ textAlign: "center" }}>
      <br />
      <Typography variant="h5" className={classes.title}>
        Heya pocketster! It's your space.
        <br />
        Fund your favorite projects or needful campaigns!
      </Typography>
      <br />
      <Grid container spacing={6}>
        <Grid item xs={6} lg={5}>
          <Button onClick={()=>handleCampaignType('p')} className={classes.btn}>
            For profit campaigns
          </Button>
        </Grid>
        <Grid item xs={6} lg={5}>
          <Button onClick={()=>handleCampaignType('np')} className={classes.btn}>
            Not For profit campaigns
          </Button>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <Grid container spacing={4}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} md={4} lg={4}>
            <MediaCard
              data={campaign}
              primaryProperty="title"
              secProperty="description"
              message1={campaign.status}
              message2={`Fund raised: INR ${campaign.fundRaised}`}
              message3={`Goal: INR ${campaign.goalAmount}`}
              url={campaign.mediaUrl}
              onClick={handleCampaignClick}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Feed;
