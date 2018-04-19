import React from 'react';
import MapComponent from './Map';
import Typography from 'material-ui/Typography';
import styled from 'react-emotion';
import { TextField, Button } from 'material-ui';

const MapSection = styled('section')`
  height: 300px;
  max-height: 300px;
  align-self: flex-start;
`;
const FlexContainer = styled('div')`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const FlexColumnContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const HeatIndicator = styled('div')`
  height: 40px;
  flex: 1 0 50%;
`;

export default function Hunt({
  mapCenter,
  mapZoom,
  warmer,
  heatIndex,
  closestStash,
  showClue1,
  showClue2,
  updateUserClaimCode,
  updateValue,
  submitClaimCode,
  error,
}) {
  return (
    <section>
      <Typography variant="display3">Hunt</Typography>
      <MapSection>
        <MapComponent mapCenter={mapCenter} mapZoom={mapZoom} />
      </MapSection>
      <FlexContainer>
        <HeatIndicator style={warmer ? null : { background: 'blue' }}>
          Colder
        </HeatIndicator>
        <HeatIndicator style={warmer ? { background: 'red' } : null}>
          Warmer
        </HeatIndicator>
      </FlexContainer>
      <FlexContainer>
        <svg style={{ width: 500, height: 200 }}>
          <g fill="#56F">
            <polygon fillOpacity={1} points="20 80, 70 80, 70 100, 20 100" />
            <polygon
              fillOpacity={heatIndex > 1 ? 1 : 0.4}
              points="80 80, 130 80, 130 100, 80 100"
            />
            <polygon
              fillOpacity={heatIndex > 2 ? 1 : 0.4}
              points="140 80, 190 80, 190 100, 140 100"
            />
            <polygon
              fillOpacity={heatIndex > 3 ? 1 : 0.4}
              points="200 80, 250 80, 250 100, 200 100"
            />
          </g>
          <g fill="#F65">
            <polygon
              fillOpacity={heatIndex > 4 ? 1 : 0.4}
              points="260 80, 310 80, 310 100, 260 100"
            />
            <polygon
              fillOpacity={heatIndex > 5 ? 1 : 0.4}
              points="320 80, 370 80, 370 100, 320 100"
            />
            <polygon
              fillOpacity={heatIndex > 6 ? 1 : 0.4}
              points="380 80, 430 80, 430 100, 380 100"
            />
          </g>
          <polygon
            fill="#F43"
            fillOpacity={heatIndex > 7 ? 1 : 0.4}
            points="440 80, 490 80, 490 100, 440 100"
          />
        </svg>
      </FlexContainer>
      <Typography variant="body1" color="error">
        {error}
      </Typography>
      <FlexContainer>
        <Button onClick={() => updateValue('showClue1', true)}>Clue 1</Button>
        {showClue1 ? (
          <Typography variant="body2">{closestStash.clue1}</Typography>
        ) : null}
      </FlexContainer>
      <FlexContainer>
        <Button onClick={() => updateValue('showClue2', true)}>Clue 2</Button>
        {showClue2 ? (
          <Typography variant="body2">{closestStash.clue2}</Typography>
        ) : null}
      </FlexContainer>
      <FlexContainer>
        <TextField
          label="Claim Code"
          onChange={event => updateValue('userClaimCode', event.target.value)}
        />
        <Button variant="raised" color="primary" onClick={submitClaimCode}>
          Claim!
        </Button>
      </FlexContainer>
    </section>
  );
}
