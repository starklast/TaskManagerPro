import React, { useEffect } from 'react'
import withStore from '~/hocs/withStore'
import DataGrid from '../DataGrid/DataGrid'
import { PAGENAMENEWUSER } from '~/common/constant'

const UsersList = (props) => {
  const data = props.stores.users.users
  const fields = props.stores.users.getOrderedFields()
  useEffect(() => {
    props.stores.users.updateData()
  }, [])
  return (
    <div>
      <DataGrid data={data} fields={fields} newItemPage={PAGENAMENEWUSER} />
    </div>
  )
}

export default withStore(UsersList)
