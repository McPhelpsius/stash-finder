import React from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import styled from 'react-emotion';

const LoginCard = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
`;

const LoginCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

const LoginCardActions = styled(CardActions)`
  display: flex;
  justify-content: flex-end;
`;

export default function Login({
  email,
  password,
  error,
  updateStateField,
  login,
}) {
  return (
    <LoginCard>
      <LoginCardContent>
        <Typography variant="title">{'Sign Up'}</Typography>
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
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </LoginCardContent>
      <LoginCardActions>
        <Button variant="raised" color="primary" onClick={login}>
          {'Login'}
        </Button>
      </LoginCardActions>
    </LoginCard>
  );
}
