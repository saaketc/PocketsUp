import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import colors from '../../config/colors';

const useStyles = makeStyles({
  root: {
        minWidth: 275,
      boxShadow: '5px 5px 5px black'
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
      fontSize: 18,
      fontWeight: '600'

    },
    btn: {
        color: colors.secondary,
        fontSize: 14,
        fontWeight:'600'
  }
});

export default function SimpleCard({ data, message1, message2, label, onClick }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {message1}
        </Typography>

        <Typography variant="body2" component="p">
          {message2}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
              <Button size="small" className={classes.btn} onClick={()=>onClick(data)}>{label}</Button>
      </CardActions>
    </Card>
  );
}
