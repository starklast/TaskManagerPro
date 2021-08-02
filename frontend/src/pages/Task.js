import React from 'react'
import ItemView from '~/components/ItemView'
import withStore from '~/hocs/withStore'
import styles from './app.module.css'
import { useHistory } from 'react-router-dom'
function Task(props) {
  const history = useHistory()
  const id = props.match.params.id
  console.log({ ...props.stores.toDoList.get(id) }.ID)
  return (
    <div className={styles.pageContent}>
      <ItemView
        itemData={props.stores.toDoList.get(id)}
        parentPageName={'Home'}
        goBack={() => {
          history.goBack()
        }}
      />
    </div>
  )
}

export default withStore(Task)
