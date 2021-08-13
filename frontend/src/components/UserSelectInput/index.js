import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import { getAllUsers } from '~/api/server'
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
      const users = await getAllUsers()
      if (active) {
        setOptions(users.map((item) => item))
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
        console.log(value)
        onChenge(value)
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
