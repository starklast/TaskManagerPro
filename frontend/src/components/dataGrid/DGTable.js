import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.css'

function DGTable({ children, className }) {
  const classes = classNames('table', className)
  return <table className={classes}>{children}</table>
}

DGTable.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default DGTable
