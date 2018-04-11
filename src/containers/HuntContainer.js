import React, { Component } from 'react';
import Hunt from '../components/Hunt';
import { withApollo } from 'react-apollo';
import getAllStashes from '../gql/getAllStashes';

class HuntContainer extends Component {
  constructor() {
    super();
    this.state = {
      stashes: [],
      closestStash: {
        id: '',
        name: '',
        lat: 0,
        lng: 0,
        claimCode: '',
        clue1: '',
        clue2: '',
        distance: 200000,
      },
      warmer: true,
      userLocation: { lat: 0, lng: 0 },
      mapZoom: 16,
    };
  }

  async componentDidMount() {
    await this.queryAllBalls();
    await this.getLocation();
    this.trackLocation();
  }

  queryAllBalls = async () => {
    try {
      const allResponse = await this.props.client.query({
        query: getAllStashes,
        fetchPolicy: 'no-cache',
      });

      this.setState({
        stashes: allResponse.data.stashes,
      });
    } catch (e) {
      this.setState({ error: "Couldn't query all the stashes" });
      console.log(e);
    }
  };

  getLocation = async () => {
    navigator.geolocation.getCurrentPosition(geo => {
      this.setState({
        userLocation: { lat: geo.coords.latitude, lng: geo.coords.longitude },
      });
      this.setClosestStash();
    });
  };

  trackLocation = async () => {
    navigator.geolocation.watchPosition(geo => {
      const { coords: { latitude, longitude } } = geo;
      const { lat, lng, distance } = this.state.closestStash;

      this.setState({
        userLocation: { lat: latitude, lng: longitude },
      });

      const newDistance = this.calculateUserDistance(lat, lng);
      const warmer = newDistance < distance;

      this.setState({
        closestStash: {
          ...this.state.closestStash,
          distance: newDistance,
        },
        warmer,
      });
    });
  };

  setClosestStash = () => {
    let closestDistance = this.state.closestStash.distance;
    this.state.stashes.forEach((stash, index) => {
      const distance = this.calculateUserDistance(stash.lat, stash.lng);
      if (distance < closestDistance) {
        closestDistance = distance;
        this.setState({ closestStash: { ...stash, distance } });
      }
    });
  };

  calculateUserDistance = (stashLat, stashLng) => {
    const { lat, lng } = this.state.userLocation;

    // calculate with pythagorean
    // lat  = largest lat - smallest lat
    const latDistance = lat - stashLat > 0 ? lat - stashLat : stashLat - lat;
    // long = largest lng - smallest lng
    const longDistance = lng - stashLng > 0 ? lng - stashLng : stashLng - lng;

    // a^2 + b^2 = c^2
    const metersSquared =
      (latDistance * 111139) ** 2 + (longDistance * 111139) ** 2;
    // return c
    return Math.round(Math.sqrt(metersSquared) * 100) / 100;
  };

  render() {
    const { mapZoom, userLocation, warmer } = this.state;
    return <Hunt mapZoom={mapZoom} mapCenter={userLocation} warmer={warmer} />;
  }
}

export default withApollo(HuntContainer);
