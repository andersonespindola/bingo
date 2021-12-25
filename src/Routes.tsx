import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'

import { Home } from './pages/Home'

/**
 * Enabled routes.
 */
export function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  )
}
