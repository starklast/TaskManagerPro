import React, { useState, useEffect } from 'react'
import ItemView from '~/components/ItemView'
import withStore from '~/hocs/withStore'
import styles from './app.module.css'
import { useHistory } from 'react-router-dom'
function User({ stores, match }) {
  const history = useHistory()
  const [loading, setloading] = useState(true)
  const [data, setData] = useState({})
  const id = match.params.id
  const users = stores.users
  useEffect(() => {
    setloading(true)
    users.get(id).then((data) => {
      setData(data)
      setloading(false)
      //setFields(data.getOrderedFields())
    })
  }, [id])
  if (loading) {
    return <strong>loading...</strong>
  }
  return (
    <div className={styles.pageContent}>
      <ItemView
        itemData={data}
        goBack={() => {
          history.goBack()
        }}
      />
    </div>
  )
}

export default withStore(User)
