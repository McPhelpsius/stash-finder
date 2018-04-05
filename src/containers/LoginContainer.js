import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import Login from '../components/Login';
import login from '../gql/login';

class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  updateStateField = (key, value) => {
    this.setState({ [key]: value });
  };

  login = async () => {
    this.setState({ error: '' });
    const { email, password } = this.state;
    console.log('logging in');
    try {
      const response = await this.props.client.mutate({
        mutation: login,
        variables: {
          email,
          password,
        },
      });

      console.log(response.data);
      if (this.props.user.role === 'ADMIN') {
        this.props.history.push('/admin');
      } else {
        this.props.history.push('/hunt');
      }
    } catch (e) {
      this.setState({ error: 'Those are some baaaaad credentials, pal.' });
      console.log(e.message);
    }
  };

  render() {
    return (
      <Login
        name={this.state.name}
        email={this.state.email}
        error={this.state.error}
        updateStateField={this.updateStateField}
        login={this.login}
      />
    );
  }
}

export default withApollo(LoginContainer);
