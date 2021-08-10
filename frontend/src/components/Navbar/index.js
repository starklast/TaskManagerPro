import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { RiLogoutBoxRLine } from 'react-icons/ri'

import { Link } from 'react-router-dom'
import classNames from 'classnames'

import styles from './app.module.css'
import { IconContext } from 'react-icons'
import { itemType } from '~/common/constant'
import withStore from '~/hocs/withStore'
export const Toggle = ({ children, ...rest }) => {
  return (
    <div className={styles.navbarToggle} {...rest}>
      {children && children.length > 0 ? (
        { children }
      ) : (
        <Link to='#' className={styles.menuBars}>
          <AiOutlineClose />
        </Link>
      )}
    </div>
  )
}

export const BodyItem = ({ cName, path, icon, title, children, ...rest }) => {
  return (
    <div>
      {children && children.length > 0 ? (
        { children }
      ) : (
        <div className={styles[cName]}>
          <Link to={path}>
            {icon}
            <div className={styles.span}>{title}</div>
          </Link>
        </div>
      )}
    </div>
  )
}

function Navbar({ SidebarData, stores, history }) {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className={styles.navbar}>
          <Link to='#' className={styles.menuBars}>
            <FaBars onClick={showSidebar} />
          </Link>
          <Link to='#' className={styles.menuBars}>
            <RiLogoutBoxRLine
              onClick={() => {
                stores.currentUser.logout()
              }}
            />
          </Link>
        </div>

        <nav
          className={
            sidebar ? classNames(styles.navMenu, styles.active) : styles.navMenu
          }
        >
          <div className={styles.navMenuItems} onClick={showSidebar}>
            <Toggle />

            <div className={styles.navMenuBody}>
              {SidebarData.filter((item) => item.type === itemType.body).map(
                (item, index) => {
                  return <BodyItem key={index} {...item} />
                }
              )}
            </div>
            <div className={styles.navMenuFooter}>
              <hr />
              {SidebarData.filter((item) => item.type === itemType.footer).map(
                (item, index) => {
                  return <BodyItem key={index} {...item} />
                }
              )}
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default withStore(Navbar)
