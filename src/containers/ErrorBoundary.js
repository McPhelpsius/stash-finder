import React, { Component, Fragment } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      hasError: false,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
    console.log('I am component, here me error', errorInfo.componentStack);
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div>
          <h1>{'Oopsies!'}</h1>
          <h3>{'Something went wrong'}</h3>
        </div>
      );
    }
    return <Fragment>{this.props.children}</Fragment>;
  }
}
