import React from 'react'
import styles from './app.module.css'
import UsersList from '~c/UsersList'
function Users() {
  return (
    <div className={styles.pageContent}>
      <UsersList />
    </div>
  )
}

export default Users
