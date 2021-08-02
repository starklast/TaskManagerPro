import React from 'react'
import ItemView from '~/components/ItemView'
import withStore from '~/hocs/withStore'
import styles from './app.module.css'
import { useHistory } from 'react-router-dom'
function User(props) {
  const history = useHistory()
  const id = props.match.params.id
  return (
    <div className={styles.pageContent}>
      <ItemView
        itemData={props.stores.users.get(id)}
        goBack={() => {
          history.goBack()
        }}
      />
    </div>
  )
}

export default withStore(User)
