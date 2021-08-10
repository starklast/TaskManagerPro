import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.css'
import { TableRow, TableCell } from '@material-ui/core'
import DGCol from './DGCol'

function DGRow({ children, className, fields, rowData, ownerPage }) {
  const classes = classNames('row', className)
  return (
    <TableRow className={classes}>
      {fields
        .filter((item) => item.visible)
        .map((field) => (
          <DGCol
            key={field.key}
            field={field}
            data={rowData}
            ownerPage={ownerPage}
          />
        ))}
    </TableRow>
  )
}

DGRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default DGRow
