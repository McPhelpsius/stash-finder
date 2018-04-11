import React from 'react';
import MapComponent from './Map';
import Typography from 'material-ui/Typography';
import styled from 'react-emotion';

const MapSection = styled('section')`
  height: 300px;
  max-height: 300px;
  align-self: flex-start;
`;
const FlexContainer = styled('div')`
  display: flex;
`;

const HeatIndicator = styled('div')`
  height: 40px;
  flex: 1 0 50%;
`;

export default function Hunt({ mapCenter, mapZoom, warmer }) {
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
    </section>
  );
}
