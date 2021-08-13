import React, { useEffect } from 'react'
import withStore from '~/hocs/withStore'
import DataGrid from '../DataGrid/DataGrid'
import { PAGENAMENEWUSER } from '~/common/constant'

const UsersList = ({ stores, history }) => {
  const data = stores.users.users
  const fields = stores.users.getOrderedFields()
  useEffect(() => {
    stores.users.updateData()
  }, [history])
  return (
    <div>
      <DataGrid data={data} fields={fields} newItemPage={PAGENAMENEWUSER} />
    </div>
  )
}

export default withStore(UsersList)
