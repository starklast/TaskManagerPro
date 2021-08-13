import React, { useState, useEffect } from 'react'
import ItemView from '~/components/ItemView'
import withStore from '~/hocs/withStore'
import styles from './app.module.css'
import { useHistory } from 'react-router-dom'
function Task({ stores, match }) {
  const history = useHistory()
  const [loading, setloading] = useState(true)
  const [data, setData] = useState({})
  //const [fields, setFields] = useState([])
  const id = match.params.id
  const taskList = stores.toDoList
  useEffect(() => {
    setloading(true)
    taskList.get(id).then((data) => {
      setData(data)
      setloading(false)
      //setFields(data.getOrderedFields())
    })
  }, [id])
  if (loading) {
    return <strong>loading...</strong>
  }
  //console.log({ ...props.stores.toDoList.get(id) }.ID)
  return (
    <div className={styles.pageContent}>
      <ItemView
        itemData={data}
        parentPageName={'Home'}
        goBack={() => {
          history.goBack()
        }}
      />
    </div>
  )
}

export default withStore(Task)
