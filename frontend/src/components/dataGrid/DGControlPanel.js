import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getPathByName } from '~/routes'
import classNames from 'classnames'
import { RiAddBoxLine } from 'react-icons/ri'
import './styles.css'
import { PAGENAMENEWTASK } from '~/common/constant'
import { Toolbar, AppBar } from '@material-ui/core'

function DGControlPanel({ className, newItemPage, ...props }) {
  let classes = classNames('DGControlPanel', className)
  return (
    <AppBar position='static'>
      <Toolbar>
        <Link className={classes} to={getPathByName(newItemPage)}>
          <RiAddBoxLine />
        </Link>
      </Toolbar>
    </AppBar>
  )
}

DGControlPanel.propTypes = {}

export default DGControlPanel
