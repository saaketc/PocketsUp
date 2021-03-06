import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import VideoPlayer from '../videoPlayer';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius:'30'
  },
  media: {
    height: 400,
  },
});

export default function MediaCard({ data, primaryProperty, secProperty, message1,
  message2, message3, tag, url, label, onClick }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
     
      <CardActionArea>
        {
          url &&
          <CardMedia
          className={classes.media}
          component={(props) => <VideoPlayer {...props} url={url}/>}
          title={data[primaryProperty]}
        />
       }
      
        <CardContent onClick={()=> onClick ? onClick(data) : null}>
        <Typography variant="h6" style={{ color:'green'}}component="h4">
          {tag}  {message1}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {data[primaryProperty]}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {data[secProperty]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
      <Typography gutterBottom variant="h7" component="h4">
           {message2}
        </Typography>
        <Typography gutterBottom variant="h7" component="h4">
          {message3}
          </Typography>
        {
          label &&
          <Button size="small" color="primary">
          {label}
        </Button>
      }
      
      </CardActions>
    </Card>
  );
}