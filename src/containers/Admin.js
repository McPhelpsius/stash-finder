import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import createStash from '../gql/createStash';
import getAllStashes from '../gql/getAllStashes';
import AdminComponent from '../components/Admin';

export const AdminContext = React.createContext();

class AdminContainer extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      status: '',
      stashes: [],
      name: '',
      lat: 0,
      lng: 0,
      claimCode: '',
      clue1: '',
      clue2: '',
      claimed: false,
      mapCenter: { lat: 39.031114, lng: -94.593063 },
      mapZoom: 15,
    };
  }

  componentDidMount() {
    this.queryAllStashes();
  }

  queryAllStashes = async () => {
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

  addStash = async () => {
    const { name, lat, lng, claimCode, clue1, clue2, claimed } = this.state;
    try {
      const lati = parseFloat(lat, 10);
      const long = parseFloat(lng, 10);
      const response = await this.props.client.mutate({
        mutation: createStash,
        variables: {
          name,
          lat: lati,
          lng: long,
          claimCode,
          clue1,
          clue2,
          claimed,
        },
      });

      this.setState({
        status: `Stash ${response.data.createStash.name} successfully added`,
        error: '',
      });

      this.queryAllStashes();
    } catch (e) {
      this.setState({ status: '', error: e.message });
      console.log('error: ', e);
    }
  };

  updateValue = (key, value) => {
    this.setState({ [key]: value });
  };

  recenterMap = (lat, lng) => {
    this.setState({ mapCenter: { lat, lng }, mapZoom: 18 });
    window.scrollTo(0, 0);
  };

  render() {
    const {
      error,
      status,
      name,
      lat,
      lng,
      claimCode,
      clue1,
      clue2,
      claimed,
      stashes,
      mapCenter,
      mapZoom,
    } = this.state;
    return (
      <AdminContext.Provider
        value={{
          recenterMap: this.recenterMap,
        }}
      >
        <AdminComponent
          error={error}
          status={status}
          name={name}
          lat={lat}
          lng={lng}
          claimCode={claimCode}
          clue1={clue1}
          clue2={clue2}
          claimed={claimed}
          addStash={this.addStash}
          stashes={stashes || []}
          updateValue={this.updateValue}
          queryAllStashes={this.queryAllStashes}
          mapCenter={mapCenter}
          mapZoom={mapZoom}
        />
      </AdminContext.Provider>
    );
  }
}

export default withApollo(AdminContainer);
