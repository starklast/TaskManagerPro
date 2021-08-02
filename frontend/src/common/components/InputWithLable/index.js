import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'

function InputWithLable({ id, lable, value, onChange, readOnly }) {
  return (
    <TextField
      id={id}
      label={lable}
      multiline
      maxRows={4}
      value={value}
      InputProps={{
        readOnly: readOnly,
      }}
      onChange={(event) => onChange(event.target.value)}
    ></TextField>
  )
}

InputWithLable.propTypes = {}
InputWithLable.defaultProps = {
  onChange: () => {},
  readOnly: false,
}
export default InputWithLable
