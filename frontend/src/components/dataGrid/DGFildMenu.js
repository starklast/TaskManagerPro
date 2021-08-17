import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Menu as MenuIcon, Edit, Delete } from '@material-ui/icons'

function DGFildMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const styles = { verticalAlign: 'inherit', marginRight: 5 }
  return (
    <>
      <MenuIcon
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        style={{ ...styles }}
      />

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>
          <Edit style={{ fontSize: 18, ...styles }} />
          edit
        </MenuItem> */}
        <MenuItem onClick={handleClose}>
          <Delete style={{ fontSize: 18, ...styles }} />
          delete
        </MenuItem>
      </Menu>
    </>
  )
}

export default DGFildMenu
