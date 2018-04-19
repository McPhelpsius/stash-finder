import React from 'react';
import Typography from 'material-ui/Typography';
import MapComponent from './Map';
import InfoModal from './InfoModal';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import StashCard from '../containers/StashCardContainer';
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
`;

const StashList = styled('section')`
  margin-top: 50px;
  flex: 1;
`;

const AddStashCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 300px;
`;

const AddStashCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

export default function Admin({
  status,
  error,
  name,
  lat,
  lng,
  claimCode,
  clue1,
  clue2,
  claimed,
  updateValue,
  addStash,
  stashes,
  queryAllStashes,
  mapCenter,
  mapZoom,
}) {
  return (
    <AdminInterFaceContainer>
      <Typography variant="display1">The World is yours, Admin</Typography>
      <MapSection>
        <MapComponent
          points={stashes}
          mapZoom={mapZoom}
          mapCenter={mapCenter}
        />
      </MapSection>
      <section />
      <Typography variant="subheading">{status}</Typography>
      <Typography variant="subheading" color="error">
        {error}
      </Typography>
      <StashList>
        {stashes.length > 0 ? (
          stashes.map((stash, index) => {
            return (
              <StashCard
                key={index}
                stash={stash}
                queryAllStashes={queryAllStashes}
              />
            );
          })
        ) : (
          <Typography variant="display1">No stashes loaded</Typography>
        )}
      </StashList>
      <section>
        <AddStashCard>
          <form
            onSubmit={event => {
              event.preventDefault();
              addStash();
              event.target.reset();
            }}
          >
            <AddStashCardContent>
              <TextField
                label="name"
                onChange={event => {
                  updateValue('name', event.target.value);
                }}
              />
              <TextField
                label="lat"
                onChange={event => {
                  updateValue('lat', event.target.value);
                }}
              />
              <TextField
                label="lng"
                onChange={event => {
                  updateValue('lng', event.target.value);
                }}
              />
              <TextField
                label="claimCode"
                onChange={event => {
                  updateValue('claimCode', event.target.value);
                }}
              />
              <TextField
                label="clue1"
                onChange={event => {
                  updateValue('clue1', event.target.value);
                }}
              />
              <TextField
                label="clue2"
                onChange={event => {
                  updateValue('clue2', event.target.value);
                }}
              />
            </AddStashCardContent>
            <CardActions>
              <Button color="primary" type="submit">
                Add Stash
              </Button>
            </CardActions>
          </form>
        </AddStashCard>
      </section>
      <InfoModal
        info={error}
        closeModal={() => {
          updateValue('error', '');
        }}
      />
    </AdminInterFaceContainer>
  );
}
