import React from 'react';
import Typography from 'material-ui/Typography';
import MapComponent from './Map';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import styled from 'react-emotion';

const AddStashCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
`;

const AddStashCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

export default function Admin({
  name,
  lat,
  long,
  claimCode,
  clue1,
  clue2,
  claimed,
}) {
  return (
    <div>
      <Typography variant="display1">The World is yours, Admin</Typography>
      <section>
        <MapComponent />
      </section>
      <section>
        <AddStashCard>
          <AddStashCardContent>
            <TextField label="name" />
            <TextField label="lat" />
            <TextField label="long" />
            <TextField label="clue1" />
            <TextField label="clue2" />
            <TextField label="claimCode" />
            {claimed ? 'Claimed' : 'Unclaimed'}
          </AddStashCardContent>
          <CardActions>
            <Button color="primary">Add Stash</Button>
          </CardActions>
        </AddStashCard>
      </section>
    </div>
  );
}
