import React from 'react'
import { browserHistory, Router, Route, IndexRedirect } from 'react-router'
import TreeModule from './modules/tree'
import NoMatchModule from './modules/no-match'
import logo from './logo.svg'
import './App.css'

function route({ path, component }) {
  return <Route path={path} component={component} />
}

function App() {
  return (
    <div className="App">
      <div className="App__header">
        <img src={logo} className="App__logo" alt="logo" />
        <h1 className='App__title'>React perf dojo</h1>
      </div>
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRedirect to={TreeModule.path} />
          {route(TreeModule)}
          {route(NoMatchModule)}
        </Route>
      </Router>
    </div>
  )
}

export default App
