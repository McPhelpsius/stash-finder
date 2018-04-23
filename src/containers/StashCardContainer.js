import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import updateStash from '../gql/updateStash';
import StashCardComponent from '../components/StashCard';

class StashCardContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      editing: false,
      ...props.stash,
    };
  }

  updateValue = (key, value) => {
    this.setState({ [key]: value });
  };

  updateStash = async () => {
    const { id, name, lat, lng, claimCode, clue1, clue2, claimed } = this.state;
    try {
      const lati = parseFloat(lat, 10);
      const long = parseFloat(lng, 10);
      const response = await this.props.client.mutate({
        mutation: updateStash,
        variables: {
          id,
          name,
          lat: lati,
          lng: long,
          claimCode,
          clue1,
          clue2,
          claimed,
        },
      });

      console.log('respone: ', response);

      this.setState({
        status: `Stash ${response.data.updateStash.name} successfully updated`,
        editing: false,
      });

      this.props.queryAllStashes();
    } catch (e) {
      this.setState({ status: e.message });
    }
  };

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  };

  render() {
    const {
      editing,
      status,
      name,
      lat,
      lng,
      claimCode,
      clue1,
      clue2,
      claimed,
    } = this.state;
    return (
      <StashCardComponent
        editing={editing}
        status={status}
        name={name}
        lat={lat}
        lng={lng}
        claimCode={claimCode}
        clue1={clue1}
        clue2={clue2}
        claimed={claimed}
        toggleEditing={this.toggleEditing}
        updateValue={this.updateValue}
        updateStash={this.updateStash}
      />
    );
  }
}

export default withApollo(StashCardContainer);
