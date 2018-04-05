import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import createStash from '../gql/createStash';
import AdminComponent from '../components/Admin';

class AdminContainer extends Component {
  state = {
    id: '',
    name: '',
    lat: '',
    long: '',
    claimCode: '',
    clue1: '',
    clue2: '',
    claimed: '',
  };

  render() {
    return (
      <AdminComponent
        id={this.state.id}
        name={this.state.name}
        lat={this.state.lat}
        long={this.state.long}
        claimCode={this.state.claimCode}
        clue1={this.state.clue1}
        clue2={this.state.clue2}
        claimed={this.state.claimed}
      />
    );
  }
}

export default withApollo(AdminContainer);
