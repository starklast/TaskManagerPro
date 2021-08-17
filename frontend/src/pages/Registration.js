import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'
import classNames from 'classnames'
import styles from './app.module.css'
import withStore from '~/hocs/withStore'
import { tokenService } from '~/api/server'
import { PAGENAMETASKS } from '~/common/constant/'
import { getPathByName } from '~/routes'

function Registration({ stores, history }) {
  let classes = classNames(styles.loginPage)
  const currentUser = stores.currentUser

  const [name, setUserName] = useState('')
  const [login, setUserLogin] = useState('')
  const [password, setUserPassword] = useState('')

  const loading = currentUser.loading
  const error = currentUser.error
  const userInfo = currentUser.userInfo
  const [correctToken, setCorrectToken] = useState(false)
  useEffect(() => {
    console.log('111')
    tokenService.checkToken().then((res) => {
      console.log(`res: ${res}`)
      setCorrectToken(res)
    })
  })

  useEffect(() => {
    if (correctToken) {
      history.push(PAGENAMETASKS)
    }
  }, [history, userInfo])
  return (
    <form className={classes} noValidate autoComplete='off'>
      <TextField
        id='name'
        label='Name'
        onChange={(e) => {
          setUserName(e.target.value)
        }}
      />
      <TextField
        id='login'
        label='email'
        helperText='login'
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
          stores.currentUser.registration({
            name: name,
            login: login,
            password: password,
          })
        }}
      >
        Confirm
      </Button>
    </form>
  )
}

Registration.propTypes = {}

export default withStore(Registration)
