import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import styled from 'react-emotion';

const MapRestrictor = styled('section')`
  max-width: 100%;
  max-height: 300px;
  flex: 1;
`;

const BannerMap = styled(Map)`
  height: 300px;
  max-height: 300px;
`;

function MapComponent({ google }) {
  return (
    <MapRestrictor>
      <BannerMap google={google} />
    </MapRestrictor>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCMVMq0ME2oI5_N1dweWm0WyAtAF8cOtC0',
})(MapComponent);
