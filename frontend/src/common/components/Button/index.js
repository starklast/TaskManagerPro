import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
function Button({ children, disabled, active, className, onClick, ...rest }) {
  return (
    <button
      className={classNames('btn', className, { active })}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  classes: PropTypes.string,
  onClick: PropTypes.func,
}
Button.defaultProps = {
  children: 'default button',
  disabled: false,
  active: false,
  classes: '',
  onClick: () => {},
}

export default Button
