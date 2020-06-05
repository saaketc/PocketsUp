import React from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import profileIllus from "../illustrations/profilePic.svg";
import { getData } from "../services/dataServices";
import { createSlug } from "../utils/generalFunctions";
import MediaCard from "./ui/mediaCard";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../config/colors";

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
    }
}));

const Profile = ({ user }) => {
  const [campaigns, setCampaigns] = React.useState([]);
    const classes = useStyles();
    const history = useHistory();

  React.useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await getData("user/campaigns");
        setCampaigns(data);
      } catch (e) {
        toast.error("Something went wrong");
      }
    };
    fetchCampaigns();
  }, []);

  const handleCampaignClick = (campaign) => {
    return history.push(
      `/campaign/${createSlug(campaign.title)}?space=${campaign._id}`
    );
    };
    const handleCreateCampaign = () => {
        return history.push('/create');
    }
//   const handlePortfolioClick = async () => {
//       try {
//         const { data } = await getData("user/portfolio");
//           console.log(data);
//           setCampaigns(data);
//       }
//       catch (e) {
//           toast.error('Something went wrong while getting your portfolio.');
//       }
//   };
  return (
    <Container>
      <br />
      <br />
      <br />
      <Grid container spacing={6}>
        <Grid item xs={12} md={4} lg={4}>
          <img src={profileIllus} alt="profile" />
        </Grid>
        <Grid item xs={12} md={5} lg={5}>
          <Typography variant="h2" style={{ fontWeight: "500" }}>
            {` ${user.firstName} ${user.lastName} `}
          </Typography>
          <br />
          <Typography variant="h6">
            {campaigns.length > 0
              ? `${campaigns.length} campaigns created so far...`
                          : `No campaigns yet!`
                      }
                      <br/>
                      <br/>
                      {campaigns.length === 0 && 
                          <Button onClick={handleCreateCampaign} className={classes.btn}>Create campaign</Button>
                   }   
          </Typography>
                  {/* <Button onClick={handlePortfolioClick}> Get funding portfolio</Button> */}
        </Grid>
      </Grid>
      <br />
      <hr />
      <Typography variant="h4" style={{ fontWeight: "500" }}>
        {campaigns.length > 0 ? "Your campaigns" : ""}
      </Typography>
      <br />
      <br />

      <Grid container spacing={6}>
        {campaigns &&
          campaigns.map((campaign) => (
            <Grid item xs={12} md={4} lg={4}>
              <MediaCard
                data={campaign}
                primaryProperty="title"
                secProperty="description"
                message1={campaign.status}
                tag={campaign.type === "p" ? "For profit" : "Not for profit"}
                url={campaign.mediaUrl}
                onClick={handleCampaignClick}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Profile;
