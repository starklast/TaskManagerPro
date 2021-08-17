import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import { userService } from '~/api/server'
import styles from './app.module.css'

export default function Asynchronous({ field, userId, onChenge }) {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0

  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      const users = await userService.getUsers(5)
      if (userId?.id && !users.some((item) => item.id == userId.id)) {
        users.push(userId)
      }
      if (active) {
        setOptions(users)
      }
    })()

    return () => {
      active = false
    }
  }, [loading])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])
  return (
    <Autocomplete
      id={field.key}
      className={styles.input}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionSelected={(option, value) => {
        return value.id ? option.id === value.id : false
      }}
      getOptionLabel={(option) => (option.name ? option.name : '')}
      options={options}
      loading={loading}
      value={userId?.id ? userId : null}
      onChange={(event, value) => {
        onChenge(value)
      }}
      onInputChange={(event, value, reason) => {
        if (reason == 'input') {
          ;(async () => {
            const users = value
              ? await userService.getFilterUsers(value, 5)
              : await userService.getUsers(5)
            if (userId?.id && !users.some((item) => item.id == userId.id)) {
              users.push(userId)
            }
            setOptions(users)
          })()
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={field.title}
          variant='outlined'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}
