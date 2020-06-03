import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import queryString from "query-string";
import { getData } from "../services/dataServices";
import colors from "../config/colors";
import VideoPlayer from "./videoPlayer";
import SimpleCard from "./ui/simpleCard";
import { subtractDates } from "../utils/generalFunctions";
import illustration from "../illustrations/support.svg";

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
    fontWeight: "600",
    color: colors.secondary,
  },
  topSpace: {
    marginTop: "30px",
  },
  fundStyle: {
    color: colors.green,
    fontWeight: "500",
  },
  fundGoal: {
    color: colors.secondary,
    fontWeight: "600",
  },
}));

const CampaignPage = (props) => {
  const { campaignTitle } = props.match.params;
  const { space } = queryString.parse(props.location.search);
  const [campaign, setCampaign] = useState({});

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const fetchCampaign = async () => {
      const { data } = await getData(`campaign/${space}`);
      console.log(data);
      setCampaign(data);
    };
    fetchCampaign();
  }, [space, campaignTitle]);

  const handleFundClick = (perk) => {
    return history.push("/checkout", { campaign, perk });
  };
  return (
    <Container>
      <Grid container spacing={4} style={{ marginTop: "50px" }}>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h3" className={classes.title}>
            {campaign.title}
          </Typography>
          <br />
          <Typography variant="h6">{campaign.description}</Typography>
          <Typography
            variant="h6"
            className={[classes.topSpace, classes.fundGoal]}
          >
            {`Fund raised INR ${campaign.fundRaised}`}
          </Typography>
          <Typography variant="h6" className={classes.fundGoal}>
            {`Campaign goal INR ${campaign.goalAmount}`}
          </Typography>

          <Typography variant="h7" className={classes.fundStyle}>
            {subtractDates(new Date(), campaign.endDate) > 0
              ? `${subtractDates(
                  new Date(),
                  campaign.endDate
                )} days left. Hurry up!`
              : ""}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <VideoPlayer url={campaign.mediaUrl} />
        </Grid>
      </Grid>
      <br />
      <hr />
      <br />
      <br />
      <Grid container spacing={6}>
        <Grid item xs={12} md={8} lg={8}>
          <Typography variant="h4" className={classes.title}>
            What's in it for you! Perks... yaaayyy!
          </Typography>
          <Grid container spacing={6} className={classes.topSpace}>
            {campaign.perks && (
              <>
                {campaign.perks.map((perk) => (
                  <Grid item xs={12} md={6} lg={6}>
                    <SimpleCard
                      message1={`Pledge INR ${perk.amount}`}
                      message2={perk.perkDescription}
                      data={perk}
                      label={`Fund INR ${perk.amount}`}
                      onClick={handleFundClick}
                    />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Grid>
              <Grid item xs={12} md={4} lg={4}>
          <img src={illustration} alt="fund" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CampaignPage;
