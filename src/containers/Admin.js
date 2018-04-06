import React, { Component } from 'react';
import { withApollo, compose, graphql } from 'react-apollo';
import createStash from '../gql/createStash';
import getAllStashes from '../gql/getAllStashes';
import AdminComponent from '../components/Admin';

class AdminContainer extends Component {
  state = {
    editing: false,
    name: '',
    lat: '',
    lng: '',
    claimCode: '',
    clue1: '',
    clue2: '',
    claimed: '',
  };

  addStash = async () => {
    const { name, lat, lng, claimCode, clue1, clue2, claimed } = this.state;
    try {
      const response = this.props.client.mutate({
        mutation: createStash,
        variables: {
          name,
          lat,
          lng,
          claimCode,
          clue1,
          clue2,
          claimed,
        },
      });

      console.log(response);
    } catch (e) {
      console.log('error: ', e);
    }
  };

  render() {
    return (
      <AdminComponent
        editing={this.state.editing}
        name={this.state.name}
        lat={this.state.lat}
        lng={this.state.lng}
        claimCode={this.state.claimCode}
        clue1={this.state.clue1}
        clue2={this.state.clue2}
        claimed={this.state.claimed}
        addStash={this.addStash}
        stashes={this.props.allStashes.stashes || []}
      />
    );
  }
}

export default compose(
  withApollo,
  graphql(getAllStashes, { name: 'allStashes' }),
)(AdminContainer);
