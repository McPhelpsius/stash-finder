import React from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import styled from 'react-emotion';

const LandingCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
`;

const LandingCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

const LandingCardActions = styled(CardActions)`
  display: flex;
  justify-content: flex-end;
`;

export default function Landing({
  name,
  email,
  password,
  updateStateField,
  goToLogin,
  signup,
}) {
  return (
    <LandingCard>
      <LandingCardContent>
        <Typography variant="title">{'Sign Up'}</Typography>
        <TextField
          label="Name"
          onChange={event => updateStateField('name', event.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          onChange={event => updateStateField('email', event.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          onChange={event => updateStateField('password', event.target.value)}
        />
      </LandingCardContent>
      <LandingCardActions>
        <Button color="primary" onClick={goToLogin}>
          {'Login'}
        </Button>
        <Button variant="raised" color="primary" onClick={signup}>
          {'Sign Up'}
        </Button>
      </LandingCardActions>
    </LandingCard>
  );
}
