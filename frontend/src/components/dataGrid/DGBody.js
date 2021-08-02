import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { TableBody, TableRow, TableCell } from '@material-ui/core'
import './styles.css'
import DGRow from './DGRow'
function DGBody({ children, className, data, fields, ownerPage }) {
  const classes = classNames('body', className)
  return (
    <TableBody className={classes}>
      {data.map((item, index) => (
        <DGRow
          key={index}
          rowData={item}
          fields={fields}
          ownerPage={ownerPage}
        />
      ))}
    </TableBody>
  )
}
/*  */
DGBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
}

export default DGBody
