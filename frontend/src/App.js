import React from 'react'
import './App.css'
import Navbar from '~/components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { routes } from '~/routes'
import withStore from '~/hocs/withStore'
import PrivateRoute from '~/hocs/PrivateRoute'

function App({ stores }) {
  const userInfo = stores.currentUser.userInfo

  return (
    <>
      <Router>
        <Navbar SidebarData={routes} />
        <Switch>
          {routes
            .filter((item) => item.component)
            .map((item, index) => {
              return item.requireAuth ? (
                <PrivateRoute
                  key={index}
                  path={item.path}
                  exact
                  component={item.component}
                />
              ) : (
                <Route
                  key={index}
                  path={item.path}
                  exact
                  component={item.component}
                />
              )
            })}
        </Switch>
      </Router>
    </>
  )
}

export default withStore(App)
