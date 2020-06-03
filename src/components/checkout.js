import React from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Container, Grid, Typography } from '@material-ui/core'; 
import { makeStyles } from "@material-ui/core/styles";
import { toast } from 'react-toastify';

import MediaCard from './ui/mediaCard';
import { createSlug } from '../utils/generalFunctions';
import { postData } from '../services/dataServices';
import colors from '../config/colors';
import illustration from '../illustrations/pay.svg';

const useStyles = makeStyles((theme) => ({
    btn: {
      fontSize: '20px',
      color: colors.white,
      border: `1px solid ${colors.primary}`,
      backgroundColor: colors.primary,
      "&:hover": {
        backgroundColor: colors.primary,
      },
    },
    topSpace: {
        marginTop:'60px'
    }
   
  }));
  
const Checkout = (props) => {
    
    const { campaign, perk } = props.location.state;
    const [status, setStatus] = React.useState(0);
    const { user } = props;
    const history = useHistory();
    const classes = useStyles();

    const handleCampaignClick = (campaign) => {
        return history.push(`campaign/${createSlug(campaign.title)}?space=${campaign._id}`);
    }
    const handlePayment = async () => {
        try {
            if (!user) {
                return history.push('/auth/login');
            }
            const transaction = {
                resource: 'campaign/fund',
                data:  {
                    campaignId: campaign._id,
                    amount: perk.amount
                }
            };
            const { data } = await postData(transaction);
            console.log(data);
            toast.success('Congrats! You successfully funded the campaign.')
            setStatus(1);
        }
        catch (e) {
            toast.error('OOops! Something went wrong...');
            console.log(e.message);
        }
    }
    return (
        <Container className={classes.topSpace}>
             <Typography variant='h4' noWrap>
                {status ? 'Thanks for trusting! Every contribution matters.'
                    :
                    'Please proceed to pay. Your contribution means a lot!'}    
                </Typography>
                <br/>
                <br/>
            <Grid container spacing={6}>
               
                <Grid item xs={12} md={6} lg={6}>
                {
                status ? 
                    
                    <Button className={classes.btn} onClick={()=> history.push('/')}>Explore more campaigns</Button>
                    :
                    <Button className={classes.btn} onClick={handlePayment}>{user ? `Pay INR ${perk.amount}` : 'Login to proceed'}</Button>

            }
            <br/>
            <br/>
            <MediaCard
              data={campaign}
              primaryProperty="title"
              secProperty="description"
              message1={campaign.status}
              url={campaign.mediaUrl}
              onClick={handleCampaignClick}
            />
          
                </Grid>    
                <Grid item xs={12} md={6} lg={6}>
                <img src={illustration} alt='checkout'/>   
                </Grid>
            </Grid>
        </Container>
    )
}

export default Checkout
