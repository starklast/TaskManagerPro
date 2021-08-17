import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'
import classNames from 'classnames'
import styles from './app.module.css'
import withStore from '~/hocs/withStore'
import { tokenService } from '~/api/server'
import { PAGENAMEREGISTRATION } from '~/common/constant/'
import { getPathByName } from '~/routes'

function login({ stores, history }) {
  let classes = classNames(styles.loginPage)
  const currentUser = stores.currentUser

  const [login, setUserLogin] = useState('')
  const [password, setUserPassword] = useState('')

  const loading = currentUser.loading
  const error = currentUser.error ? currentUser.error : ''
  const userInfo = currentUser.userInfo

  const redirect = location.search ? location.search.split('=')[1] : '/'

  console.log('rendering login')
  console.log(`error ${error}`)

  useEffect(() => {
    console.log('useEffect in login')
    tokenService.checkToken().then((res) => {
      if (res) {
        history.push(redirect)
      }
    })
  }, [history, currentUser.userInfo])

  return (
    <form className={classes} noValidate autoComplete='off'>
      <TextField
        id='login'
        label='login'
        error={error.length > 0}
        onChange={(e) => {
          setUserLogin(e.target.value)
        }}
      />
      <TextField
        error={error.length > 0}
        id='password'
        label='password'
        helperText={error}
        onChange={(e) => {
          setUserPassword(e.target.value)
        }}
      />
      <Button
        variant='outlined'
        onClick={() => {
          stores.currentUser.login({ login: login, password: password }, () => {
            //console.log(`button redirect ${redirect}`)
            //history.push(redirect)
          })
        }}
      >
        login
      </Button>
      <Button
        variant='outlined'
        onClick={() => {
          history.push(getPathByName(PAGENAMEREGISTRATION))
        }}
      >
        Registration
      </Button>
    </form>
  )
}

login.propTypes = {}

export default withStore(login)
