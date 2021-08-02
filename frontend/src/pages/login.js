import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'
import classNames from 'classnames'
import styles from './app.module.css'
import withStore from '~/hocs/withStore'
import { checkToken } from '~/api/server'

function login({ stores, history }) {
  let classes = classNames(styles.loginPage)
  const currentUser = stores.currentUser

  const [login, setUserLogin] = useState({})
  const [password, setUserPassword] = useState({})

  const loading = currentUser.loading
  const error = currentUser.error
  const userInfo = currentUser.userInfo

  const redirect = location.search ? location.search.split('=')[1] : '/'
  console.log(userInfo.token)
  useEffect(() => {
    if (checkToken()) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  return (
    <form className={classes} noValidate autoComplete='off'>
      <TextField
        id='login'
        label='login'
        onChange={(e) => {
          setUserLogin(e.target.value)
        }}
      />
      <TextField
        id='password'
        label='password'
        onChange={(e) => {
          setUserPassword(e.target.value)
        }}
      />
      <Button
        variant='outlined'
        onClick={() => {
          stores.currentUser.login({ login: login, password: password })
        }}
      >
        login
      </Button>
    </form>
  )
}

login.propTypes = {}

export default withStore(login)
