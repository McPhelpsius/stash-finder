import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import styled from 'react-emotion';

const MapRestrictor = styled('section')`
  max-width: 100%;
  max-height: 300px;
  flex: 1;
  margin-left: -2rem;
`;

const BannerMap = styled(Map)`
  height: 300px;
  max-height: 300px;
`;

function MapComponent({ google, points, mapCenter, mapZoom }) {
  return (
    <MapRestrictor>
      <BannerMap
        google={google}
        initialCenter={{ lat: 39.031114, lng: -94.593063 }}
        center={mapCenter}
        zoom={mapZoom}
      >
        {points && points.length > 0
          ? points.map((point, index) => {
              return (
                <Marker
                  key={index}
                  title={point.name}
                  name={point.name}
                  position={{ lat: point.lat, lng: point.lng }}
                />
              );
            })
          : null}
      </BannerMap>
    </MapRestrictor>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCMVMq0ME2oI5_N1dweWm0WyAtAF8cOtC0',
})(MapComponent);
