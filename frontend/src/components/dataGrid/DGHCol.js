import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { TableCell } from '@material-ui/core'
import './styles.css'
function DGHCol({ children, className, fild }) {
  const classes = classNames('hCol', className)
  return <TableCell>{fild.title}</TableCell>
  // <th className={classes}>{children}</th>
}

DGHCol.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fild: PropTypes.shape({
    title: PropTypes.string,
  }),
}

export default DGHCol
