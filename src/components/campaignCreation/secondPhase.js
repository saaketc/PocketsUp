import React from 'react'
import { Container, Grid, Typography, Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextForm from "../ui/textForm";
import { toast } from 'react-toastify';

const SecondPhase = ({ onAddPerk, onSubmit }) => {
    
    const [perk, setPerk] = React.useState({});

    const handleAddClick = () => {
        onAddPerk(perk);
        toast.success('Perk added!');
        setPerk({});
    }
    const handleChange = ({ currentTarget }) => {
        let data = { ...perk };
        data[currentTarget.name] = currentTarget.value;
        setPerk(data);
    }
    return (
        <div>
            <h1>Add perks or rewards for the investors</h1>  
           <Button onClick={handleAddClick}>
            <AddCircleIcon
                
                    style={{ fontSize: '30' }} />
            </Button>
            <form onSubmit={(event)=>onSubmit(event, perk)}>
            <TextForm
          label="Membership price"
                    fullWidth={true}
                    placeholder="Enter the membership price"
          type="number"
          name="amount"
          required={true}
          value={perk.amount}
          onChange={handleChange}
              />
              <br/>
        <TextForm
           label="Membership benefits"
          placeholder="Enter the exclusive benefits for the above price"
          fullWidth={true}
          type="text"
          name="perkDescription"
          multiline={true}
          rows='5'
          required={true}
          value={perk.perkDescription}
          onChange={handleChange}
              />
                <br />
                <Button type="submit">Create campaign</Button>
            </form>
            
        </div>
    )
}

export default SecondPhase
