import React from 'react';
import Typography from 'material-ui/Typography';
import MapComponent from './Map';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import StashCard from './StashCard';
import Button from 'material-ui/Button';
import styled from 'react-emotion';

const AdminInterFaceContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MapSection = styled('section')`
  height: 300px;
  max-height: 300px;
  align-self: flex-start;
  margin-left: -2rem;
`;

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
  editing,
  name,
  lat,
  lng,
  claimCode,
  clue1,
  clue2,
  claimed,
  addStash,
  stashes,
}) {
  return (
    <AdminInterFaceContainer>
      <Typography variant="display1">The World is yours, Admin</Typography>
      <MapSection>
        <MapComponent />
      </MapSection>
      <section />
      {stashes.length > 0 ? (
        stashes.map((stash, index) => {
          return <StashCard key={index} editing={editing} stash={stash} />;
        })
      ) : (
        <Typography variant="display1">No stashes loaded</Typography>
      )}
      <section>
        <AddStashCard>
          <AddStashCardContent>
            <TextField label="name" />
            <TextField label="lat" />
            <TextField label="lng" />
            <TextField label="claimCode" />
            <TextField label="clue1" />
            <TextField label="clue2" />
          </AddStashCardContent>
          <CardActions>
            <Button color="primary">Add Stash</Button>
          </CardActions>
        </AddStashCard>
      </section>
    </AdminInterFaceContainer>
  );
}
