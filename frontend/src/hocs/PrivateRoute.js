import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import withStore from '~/hocs/withStore'
import { Route, Redirect } from 'react-router-dom'
import { checkToken } from '~/api/server'
import { set } from 'mobx'

function PrivateRoute({ children, stores, component, ...rest }) {
  const [loading, setloading] = useState(true)
  const [correctToken, setCorrectToken] = useState(false)
  useEffect(() => {
    console.log('PR start')
    setloading(true)
    checkToken().then((res) => {
      console.log(`res ${res}`)
      setCorrectToken(res)
      console.log(`correctToken ${correctToken}`)
      setloading(false)
    })
  }, [rest.history, stores.currentUser.userInfo])

  console.log(`loading ${loading}`)
  if (loading) {
    return <p>loading...</p>
  }
  if (correctToken) {
    //stores.toDoList.updateData()
    console.log('есть токкен')
    rest = { ...rest, component }
  } else {
    console.log('нет токкена')
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
