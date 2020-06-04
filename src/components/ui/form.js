import React from "react";
// import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import HeadsetIcon from "@material-ui/icons/Headset";
import IconButton from "@material-ui/core/IconButton";

import colors from "../../config/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btn: {
    color: colors.white,
    backgroundColor: colors.primary 
  }
}));

export default function Form(props) {
  const classes = useStyles();
  const { fields, heading, label, signup, postSubmitLogic } = props;
  const [formFields, setFormFields] = React.useState({});

  const handleChange = ({ currentTarget }) => {
    let form = { ...formFields };
    form[currentTarget.name] = currentTarget.value;
    setFormFields(form);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formFields };

    // data processing and working logic for individual forms
    postSubmitLogic(data);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "30px",
            color: colors.primary,
          }}
        >
          {heading}
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {fields.map((f) => (
              <>
                <Grid item xs={12} sm={12} lg={12}>
                  <TextField
                    type={f.type}
                    name={f.name}
                    multiline={f.multiline}
                    rows={f.rows}
                    variant="outlined"
                    value={formFields[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder ? f.placeholder : ""}
                    required
                    fullWidth
                    id={f.name}
                    label={f.label}
                    autoFocus
                  />
                </Grid>
              </>
            ))}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            
            className={[classes.submit, classes.btn]}
          >
            {label}
          </Button>
          {signup && (
            <>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/auth/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
        </form>
      </div>
    </Container>
  );
}
