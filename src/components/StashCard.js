import React from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import styled from 'react-emotion';

const StashCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: 0 auto 20px;
  min-width: 300px;
  max-width: 400px;
`;

const StashCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

export default function Admin({
  stash: { name, lat, lng, claimCode, clue1, clue2, claimed },
  editing,
  recenterMap,
}) {
  return (
    <StashCard
      onClick={() => {
        recenterMap(lat, lng);
      }}
    >
      <StashCardContent>
        <Typography variant="body1">{`Name: ${name}`}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="name"
        />
        <Typography variant="body1">{`Latitude: ${lat}`}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="lat"
        />
        <Typography variant="body1">{`Longitude: ${lng}`}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="lng"
        />
        <Typography variant="body1">{`Claim Code: ${claimCode}`}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="claimCode"
        />
        <Typography variant="body1">{`Clue 1: ${clue1}`}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="clue2"
        />
        <Typography variant="body1">{`Clue 2: ${clue2}`}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="clue2"
        />
        {claimed ? 'Claimed' : 'Unclaimed'}
      </StashCardContent>
    </StashCard>
  );
}
