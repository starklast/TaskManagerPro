import React from 'react'
import PropTypes from 'prop-types'

function Input({ value, funcToCall }) {
  const changeCount = (value, funcToCall) => {
    funcToCall.forEach((func) => {
      func(value)
    })
  }
  const checkEnterKey = (e, funcToCall) => {
    if (e.keyCode === 13) {
      changeCount(e.target.value, funcToCall)
    }
  }
  return (
    <input
      type='text'
      defaultValue={value}
      onKeyUp={(e) => {
        checkEnterKey(e, funcToCall)
      }}
      onBlur={(e) => {
        changeCount(e.target.value, funcToCall)
      }}
    />
  )
}

Input.propTypes = {
  value: PropTypes.string,
  funcToCall: PropTypes.arrayOf(PropTypes.func),
}

export default Input
