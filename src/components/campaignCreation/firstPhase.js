import React from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import SelectForm from "../ui/selectForm";
import TextForm from "../ui/textForm";
import campaignIllus from "../../illustrations/together.svg";
import colors from "../../config/colors";

const durationOptions = [
  { value: 15, label: "15 days" },
  { value: 30, label: "30 days" },
  { value: 45, label: "45 days" },
  { value: 60, label: "60 days" },
];
const typeOptions = [
  { value: "p", label: "For profit" },
  { value: "np", label: "Not for profit" },
];

const useStyles = makeStyles((theme) => ({
    title: {
    fontWeight: '600'
    },
    btn: {
        color: colors.white,
        border: `1px solid ${colors.primary}`,
        backgroundColor: colors.primary,
        "&:hover": {
          backgroundColor: colors.primary,
        },
    },
    left: {
        alignText: 'left'
    }
}));

const FirstPhase = ({ onSubmit }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      type: "",
      mediaUrl: "",
      goalAmount: "",
      duration: 15,
    },
    onSubmit: (values) => {
      // console.log(values);
      onSubmit(values);
    },
  });

  return (
      <Container>
            <Typography variant="h5" className={classes.title}>
              Share your creativity with a campaign!
      </Typography>
      <br />
         
      <br />
          
      <form onSubmit={formik.handleSubmit}>
        <TextForm
          label="Title"
          fullWidth={true}
          type="text"
          name="title"
          required={true}
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <br />
        <TextForm
          label="Description"
          fullWidth={true}
          type="text"
          name="description"
          required={true}
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <br />

        <SelectForm
          label="Campaign type"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          options={typeOptions}
        />
        <br />

        <TextForm
          label="Video url of your project"
          placeholder="Paste your project's youtube or any other video url"
          fullWidth={true}
          type="text"
          name="mediaUrl"
          required={true}
          value={formik.values.mediaUrl}
          onChange={formik.handleChange}
        />
        <br />

        <TextForm
          label="Goal amount"
          placeholder="Enter the amount you wish to raise"
          fullWidth={true}
          type="number"
          name="goalAmount"
          required={true}
          value={formik.values.goalAmount}
          onChange={formik.handleChange}
        />
        <br />

        <SelectForm
          label="Campaign duration"
          name="duration"
          value={formik.values.duration}
          onChange={formik.handleChange}
          options={durationOptions}
        />
        <br />

                      <Button className={classes.btn} type="submit">Continue</Button>
      </form>
            
    </Container>
  );
};

export default FirstPhase;
