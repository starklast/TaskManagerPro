import React from 'react'
import PropTypes from 'prop-types'
import { Select, MenuItem, InputLabel } from '@material-ui/core'
import { ID, NAME } from '~/common/constant'
import User from '~/components/User'
function EnumSelectInput({ field, data, onChenge }) {
  const values = []
  for (const key in field.values) {
    if (Object.hasOwnProperty.call(field.values, key)) {
      values.push(
        <MenuItem key={key} value={key}>
          {field.values[key]}
        </MenuItem>
      )
    }
  }

  return (
    <div>
      <InputLabel htmlFor={field.key}>{field.title}</InputLabel>
      <Select
        labelId={`label_${field.key}`}
        id={field.key}
        value={data === undefined ? '' : data}
        displayEmpty
        onChange={(event) => {
          onChenge(event.target.value)
        }}
        renderValue={(value) => field.values[value]}
      >
        {values}
      </Select>
    </div>
  )
}

EnumSelectInput.propTypes = {}

export default EnumSelectInput
