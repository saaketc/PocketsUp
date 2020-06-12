import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MediaCard from "../components/ui/mediaCard";
import { getData } from "../services/dataServices";
import colors from "../config/colors";
import { createSlug } from "../utils/generalFunctions";
import { toast } from "react-toastify";

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

const ModeratorDashboard = (props) => {
  const history = useHistory();
  const [nfBucket, setNfBucket] = useState([]);
  const [refundBucket, setRefundBucket] = useState([]);
    const [exactCompleted, setExactCompleted] = useState([]);
    const { user } = props.user;


  const classes = useStyles();

  useEffect(() => {
    const fetchCampaigns = async () => {
        try {
            const { data } = await getData("moderator/");
            setNfBucket(data.ngoBucket);
            setRefundBucket(data.refundBucket);
            setExactCompleted(data.exact);
        }
        catch (e) {
            toast.error('Something went wrong.');
        }
    };
    fetchCampaigns();
  }, []);

//   const handleCampaignType = async (type) => {
//     console.log(type);
//     if (type === "p") {
//       try {
//         const { data } = await getData("campaign/forProfit");
//         console.log(data);
//         setCampaigns(data);
//       } catch (e) {
//         console.log(e.message);
//       }
//     } else if (type === "np") {
//       try {
//         const { data } = await getData("campaign/forNonProfit");
//         console.log(data);
//         setCampaigns(data);
//       } catch (e) {
//         console.log(e.message);
//       }
//     }
//   };
  const handleCampaignClick = (campaign) => {
    return history.push(
      `/campaign/${createSlug(campaign.title)}?space=${campaign._id}`
    );
  };
  return (
    <Container style={{ textAlign: "center" }}>
                        <br />
         
                    <Typography variant="h5" className={classes.title}>
      Moderator Dashboard
      </Typography>
      <br />
      <br />
      
      <Grid container spacing={4}>
              <Grid item xs={12} lg={6} md={6}>
                  <Typography variant='h5' className={classes.title}>
                      Non profit bucket campaigns    
                  </Typography>
                  <br/>
                  
{nfBucket.map((campaign) => (
    <Grid item xs={12} md={4} lg={4}>
      <MediaCard
        data={campaign}
        primaryProperty="title"
        message2={`Fund raised: INR ${campaign.fundRaised}`}
        message3={`Goal: INR ${campaign.goalAmount}`}
        onClick={handleCampaignClick}
      />
    </Grid>

  ))}
              </Grid>

              <Grid item xs={12} lg={6} md={6}>
              <Typography variant='h5' className={classes.title}>
                      Refund campaigns    
                  </Typography>
                  <br/>
                  
{refundBucket.map((campaign) => (
    <Grid item xs={12} md={4} lg={4}>
      <MediaCard
        data={campaign}
        primaryProperty="title"
        message2={`Fund raised: INR ${campaign.fundRaised}`}
        message3={`Goal: INR ${campaign.goalAmount}`}
        onClick={handleCampaignClick}
      />
    </Grid>

  ))}
              </Grid>

      </Grid>
               
         
   

    </Container>
  );
};

export default ModeratorDashboard;
