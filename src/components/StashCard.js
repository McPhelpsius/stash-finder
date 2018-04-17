import React from 'react';
import Typography from 'material-ui/Typography';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import styled from 'react-emotion';

const StashCardWrapper = styled(Card)`
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

// TODO: Create editing state
// TODO: Form
// TODO: Prepopulate values with state
// TODO: UpdateValue function onChange of TextField
// TODO: UpdateValue function onToggle(?) of Claimed CheckBox
// TODO: Edit, Save, Cancel Buttons
// TODO: UpdateStash call onClick Save

export default function StashCard({
  status,
  name,
  lat,
  lng,
  claimCode,
  clue1,
  clue2,
  claimed,
  editing,
  toggleEditing,
  updateValue,
  updateStash,
  recenterMap,
}) {
  return (
    <StashCardWrapper>
      <StashCardContent
        onClick={() => {
          return editing ? null : recenterMap(lat, lng);
        }}
      >
        <Typography variant="body1">{`Name: ${name}`}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="name"
          value={name}
          onChange={event => updateValue('name', event.target.value)}
        />
        <Typography variant="body1">{`Latitude: ${lat}`}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="lat"
          value={lat}
          onChange={event => updateValue('lat', event.target.value)}
        />
        <Typography variant="body1">{`Longitude: ${lng}`}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="lng"
          value={lng}
          onChange={event => updateValue('lng', event.target.value)}
        />
        <Typography variant="body1">{`Claim Code: ${claimCode}`}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="claimCode"
          value={claimCode}
          onChange={event => updateValue('claimCode', event.target.value)}
        />
        <Typography variant="body1">{`Clue 1: ${clue1}`}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="clue1"
          value={clue1}
          onChange={event => updateValue('clue1', event.target.value)}
        />
        <Typography variant="body1">{`Clue 2: ${clue2}`}</Typography>
        <TextField
          style={editing ? { display: 'block' } : { display: 'none' }}
          label="clue2"
          value={clue2}
          onChange={event => updateValue('clue2', event.target.value)}
        />
        {claimed ? 'Claimed' : 'Unclaimed'}
        {status}
      </StashCardContent>
      {editing ? (
        <CardActions>
          <Button color="secondary" onClick={toggleEditing}>
            {'Cancel'}
          </Button>
          <Button color="primary" variant="raised" onClick={updateStash}>
            {'Save'}
          </Button>
        </CardActions>
      ) : (
        <CardActions>
          <Button color="primary" onClick={toggleEditing}>
            {'Edit'}
          </Button>
        </CardActions>
      )}
    </StashCardWrapper>
  );
}

// import { AdminContext } from '../containers/Admin';

// const StashCardWrapper = styled(Card)`
//   display: flex;
//   flex-direction: column;
//   margin: 0 auto 20px;
//   min-width: 300px;
//   max-width: 400px;
// `;

// const StashCardContent = styled(CardContent)`
//   display: flex;
//   flex-direction: column;
// `;

// // TODO: Create editing state
// // TODO: Form
// // TODO: Prepopulate values with state
// // TODO: UpdateValue function onChange of TextField
// // TODO: UpdateValue function onToggle(?) of Claimed CheckBox
// // TODO: Edit, Save, Cancel Buttons
// // TODO: UpdateStash call onClick Save

// export default function StashCard({
//   status,
//   name,
//   lat,
//   lng,
//   claimCode,
//   clue1,
//   clue2,
//   claimed,
//   editing,
//   toggleEditing,
//   updateValue,
//   updateStash,
//   recenterMap,
// }) {
//   return (
//     <StashCardWrapper>
//       <AdminContext.Consumer>
//         {context => {
//           return <div>{context.state.providerName}</div>;
//         }}
//       </AdminContext.Consumer>
//       <StashCardContent
//         onClick={() => {
//           return editing ? null : recenterMap(lat, lng);
//         }}
//       >
//         <Typography variant="body1">{`Name: ${name}`}</Typography>
//         <TextField
//           style={editing ? { display: 'block' } : { display: 'none' }}
//           label="name"
//           value={name}
//           onChange={event => updateValue('name', event.target.value)}
//         />
//         <Typography variant="body1">{`Latitude: ${lat}`}</Typography>
//         <TextField
//           style={editing ? { display: 'block' } : { display: 'none' }}
//           label="lat"
//           value={lat}
//           onChange={event => updateValue('lat', event.target.value)}
//         />
//         <Typography variant="body1">{`Longitude: ${lng}`}</Typography>
//         <TextField
//           style={editing ? { display: 'block' } : { display: 'none' }}
//           label="lng"
//           value={lng}
//           onChange={event => updateValue('lng', event.target.value)}
//         />
//         <Typography variant="body1">{`Claim Code: ${claimCode}`}</Typography>
//         <TextField
//           style={editing ? { display: 'block' } : { display: 'none' }}
//           label="claimCode"
//           value={claimCode}
//           onChange={event => updateValue('claimCode', event.target.value)}
//         />
//         <Typography variant="body1">{`Clue 1: ${clue1}`}</Typography>
//         <TextField
//           style={editing ? { display: 'block' } : { display: 'none' }}
//           label="clue1"
//           value={clue1}
//           onChange={event => updateValue('clue1', event.target.value)}
//         />
//         <Typography variant="body1">{`Clue 2: ${clue2}`}</Typography>
//         <TextField
//           style={editing ? { display: 'block' } : { display: 'none' }}
//           label="clue2"
//           value={clue2}
//           onChange={event => updateValue('clue2', event.target.value)}
//         />
//         {claimed ? 'Claimed' : 'Unclaimed'}
//         {status}
//       </StashCardContent>
//       {editing ? (
//         <CardActions>
//           <Button color="secondary" onClick={toggleEditing}>
//             {'Cancel'}
//           </Button>
//           <Button color="primary" variant="raised" onClick={updateStash}>
//             {'Save'}
//           </Button>
//         </CardActions>
//       ) : (
//         <CardActions>
//           <Button color="primary" onClick={toggleEditing}>
//             {'Edit'}
//           </Button>
//         </CardActions>
//       )}
//     </StashCardWrapper>
//   );
// }
