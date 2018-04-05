import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import Landing from '../components/Landing';
import signup from '../gql/signup';

class LandingContainer extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  updateStateField = (key, value) => {
    this.setState({ [key]: value });
  };

  goToLogin = async () => {
    this.props.history.push('/login');
  };

  signup = async () => {
    const { name, email, password } = this.state;
    console.log(this.props, 'signup');

    try {
      const response = await this.props.client.mutate({
        mutation: signup,
        variables: {
          name,
          email,
          password,
        },
      });

      console.log(response.data);
      this.props.history.push('/hunt');
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <Landing
        name={this.state.name}
        email={this.state.email}
        password={this.state.password}
        updateStateField={this.updateStateField}
        goToLogin={this.goToLogin}
        signup={this.signup}
      />
    );
  }
}

export default withApollo(LandingContainer);
