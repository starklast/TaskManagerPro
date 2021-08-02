import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import withStore from '~/hocs/withStore'
import { Route, Redirect } from 'react-router-dom'
import { checkToken } from '~/api/server'

function PrivateRoute({ children, stores, component, ...rest }) {
  if (checkToken()) {
    //stores.toDoList.updateData()
    rest = { ...rest, component }
  } else {
    rest = {
      ...rest,
      render: ({ location }) => {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      },
    }
  }

  return <Route {...rest} />
}

PrivateRoute.propTypes = {}

export default withStore(PrivateRoute)
