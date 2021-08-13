import React from 'react'
import PropTypes from 'prop-types'
import { Select, MenuItem, InputLabel } from '@material-ui/core'
import { ID, NAME } from '~/common/constant'
import User from '~/components/User'
import withStore from '~/hocs/withStore'
function UserSelectInput({ field, userId, onChenge, stores }) {
  const users = stores.users
  return (
    <div>
      <InputLabel htmlFor={field.key}>{field.title}</InputLabel>
      <Select
        labelId={`label_${field.key}`}
        id={field.key}
        value={userId === undefined ? '' : userId[ID]}
        onChange={(event) => {
          onChenge(users.findById(event.target.value))
        }}
        renderValue={(value) => <User userId={users.findById(value)} />}
      >
        {users.users.map((item) => {
          return (
            <MenuItem key={item[ID]} value={item[ID]}>
              {item[NAME]}
            </MenuItem>
          )
        })}
      </Select>
    </div>
  )
}

UserSelectInput.propTypes = {}

export default withStore(UserSelectInput)
