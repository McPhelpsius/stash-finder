import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Landing from './containers/LandingContainer';
import Login from './containers/LoginContainer';
import Hunt from './components/Hunt';
import Admin from './containers/Admin';
import Claim from './components/Claim';

import 'tachyons';
import './index.css';

const client = new ApolloClient({ uri: 'http://localhost:4000' });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Fragment>
        <nav className="pa3 pa4-ns">
          <Link
            className="link dim black b f6 f5-ns dib mr3"
            to="/admin"
            title="Admin"
          >
            Admin
          </Link>
          <NavLink
            className="link dim f6 f5-ns dib mr3 black"
            activeClassName="gray"
            exact
            to="/Hunt"
            title="Live Hunt"
          >
            Hunt
          </NavLink>
          <NavLink
            className="link dim f6 f5-ns dib mr3 black"
            activeClassName="gray"
            exact
            to="/logout"
            title="Logout"
          >
            Logout
          </NavLink>
        </nav>
        <div className="fl w-100 pl4 pr4">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route path="/hunt" component={Hunt} />
            <Route path="/admin" component={Admin} />
            <Route path="/claim" component={Claim} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
