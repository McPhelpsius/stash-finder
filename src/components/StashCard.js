import React from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import styled from 'react-emotion';

const StashCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: auto;
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
}) {
  return (
    <StashCard>
      <StashCardContent>
        <Typography variant="body1">{name}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="name"
        />
        <Typography variant="body1">{lat}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="lat"
        />
        <Typography variant="body1">{lng}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="lng"
        />
        <Typography variant="body1">{claimCode}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="claimCode"
        />
        <Typography variant="body1">{clue1}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="clue2"
        />
        <Typography variant="body1">{clue2}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="clue2"
        />
        {claimed ? 'Claimed' : 'Unclaimed'}
      </StashCardContent>
    </StashCard>
  );
}
