import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { TableCell } from '@material-ui/core'
import DGFild from './DGFild'
import './styles.css'
function DGCol({ children, className, field, data, ownerPage }) {
  const classes = classNames('col', className)
  return (
    <TableCell className={classes}>
      <DGFild data={data} field={field} ownerPage={ownerPage} short />
    </TableCell>
  )
}

DGCol.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default DGCol
