import React from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";

import FirstPhase from "./firstPhase";
import SecondPhase from "./secondPhase";
import { postData } from "../../services/dataServices";
import { createSlug } from "../../utils/generalFunctions";



const CreateCampaign = () => {
  const [formValues, setFormValues] = React.useState({});
  const [perksVal, setPerksVal] = React.useState([]);
  const [nextTab, setNextTab] = React.useState(1);


  const handleFirstPhaseSubmit = (values) => {
    console.log(values);
    setFormValues(values);
    setNextTab(2);
  };

  const handleAddPerk = (perk) => {
    const allPerks = [...perksVal, perk];
    return setPerksVal(allPerks);
  };

  const handleSecondPhaseSubmit = async (event, perk) => {
    event.preventDefault();
    const perks = [...perksVal];
    perks.push(perk);
    const allData = {
      ...formValues,
      perks,
    };
    const toSubmit = {
      resource: "campaign/create",
      data: allData,
    };
    const { data: campaign } = await postData(toSubmit);
    return (window.location.href = `/campaign/${createSlug(
      campaign.title
    )}?space=${campaign._id}`);
  };

  return (
    <Container maxWidth="xs">
      {nextTab === 1 ? (
        <FirstPhase onSubmit={handleFirstPhaseSubmit} />
      ) : (
        <SecondPhase
          onAddPerk={handleAddPerk}
          onSubmit={handleSecondPhaseSubmit}
        />
      )}
    </Container>
  );
};

export default CreateCampaign;
