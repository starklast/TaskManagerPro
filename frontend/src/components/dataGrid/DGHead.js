import React from 'react'
import PropTypes from 'prop-types'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import classNames from 'classnames'
import DGHCol from './DGHCol'
import './styles.css'
function DGHead({ children, className, fields }) {
  const classes = classNames('head', className)
  return (
    <TableHead className={classes}>
      <TableRow>
        {fields.map((item) => {
          return <DGHCol key={item.key} fild={item} />
        })}
      </TableRow>
    </TableHead>
  )
}

DGHead.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fields: PropTypes.array,
}

export default DGHead
