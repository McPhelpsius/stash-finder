import React, { Component } from 'react';
import Hunt from '../components/Hunt';
import { withApollo } from 'react-apollo';
import getUnclaimedStashes from '../gql/getUnclaimedStashes';
import claimStash from '../gql/claimStash';

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
      showClue1: false,
      showClue2: false,
      userClaimCode: '',
      warmer: true,
      heatIndex: 1,
      userLocation: { lat: 0, lng: 0 },
      mapZoom: 16,
      error: '',
    };
  }

  async componentDidMount() {
    await this.queryUnclaimedStashes();
    await this.getLocation();
    this.trackLocation();
  }

  queryUnclaimedStashes = async () => {
    try {
      const allResponse = await this.props.client.query({
        query: getUnclaimedStashes,
        fetchPolicy: 'no-cache',
      });

      this.setState({
        stashes: allResponse.data.unclaimedStashes,
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
      let heatIndex = this.state.heatIndex;

      if (distance <= 10) {
        heatIndex = 8;
      } else if (distance <= 50) {
        heatIndex = 7;
      } else if (distance <= 100) {
        heatIndex = 6;
      } else if (distance <= 150) {
        heatIndex = 5;
      } else if (distance <= 200) {
        heatIndex = 4;
      } else if (distance <= 300) {
        heatIndex = 3;
      } else if (distance <= 400) {
        heatIndex = 2;
      } else {
        heatIndex = 1;
      }

      this.setState({
        closestStash: {
          ...this.state.closestStash,
          distance: newDistance,
        },
        warmer,
        heatIndex,
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

  updateValue = (key, value) => {
    this.setState({ [key]: value });
  };

  submitClaimCode = async () => {
    const { closestStash, userClaimCode } = this.state;
    this.setState({ error: '' });

    try {
      const claimResponse = await this.props.client.mutate({
        mutation: claimStash,
        variables: {
          id: closestStash.id,
          claimCode: userClaimCode,
        },
      });

      if (claimResponse.data.claimStash.claimed === true) {
        await this.queryUnclaimedStashes();
        this.setState({
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
        });
        this.setClosestStash();
      }
    } catch (error) {
      console.log(error);
      this.setState({ error: 'That claim code is wrong' });
    }
  };

  render() {
    const {
      mapZoom,
      userLocation,
      warmer,
      heatIndex,
      error,
      stashes,
      closestStash,
      showClue1,
      showClue2,
    } = this.state;
    return (
      <Hunt
        mapZoom={mapZoom}
        mapCenter={userLocation}
        warmer={warmer}
        heatIndex={heatIndex}
        updateUserClaimCode={this.updateUserClaimCode}
        updateValue={this.updateValue}
        submitClaimCode={this.submitClaimCode}
        error={error}
        stashes={stashes}
        closestStash={closestStash}
        showClue1={showClue1}
        showClue2={showClue2}
      />
    );
  }
}

export default withApollo(HuntContainer);
