import React, { useEffect } from 'react'
import styles from './app.module.css'
import TaskList from '~c/TaskList'
import withStore from '~/hocs/withStore'
function Home({ stores, history }) {
  /*   const userInfo = stores.currentUser.userInfo

  useEffect(() => {
    if (!userInfo.token) {
      history.push('/login')
    }
  }, [userInfo]) */

  return (
    <div className={styles.pageContent}>
      <TaskList />
    </div>
  )
}

export default withStore(Home)
