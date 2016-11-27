import React, { Component } from 'react';
import { browserHistory, Router, Route, IndexRedirect } from 'react-router';
import TreeModule from './modules/tree';
import NoMatch from './modules/no-match';
import logo from './logo.svg';
import './App.css';

function routeFromModule({ path, component }) {
  return <Route path={path} component={component} />
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React perf dojo</h2>
        </div>
        <Router history={browserHistory}>
          <Route path="/">
            <IndexRedirect to={TreeModule.path} />
            {routeFromModule(TreeModule)}
            <Route path="*" component={NoMatch} />
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
