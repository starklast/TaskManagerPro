import React, { useEffect } from 'react'
import withStore from '~/hocs/withStore'
import TaskItem from '../TaskItem'
import DataGrid from '../DataGrid/DataGrid'
import { PAGENAMENEWTASK } from '~/common/constant'

const toDoList = (props) => {
  const toDoList = props.stores.toDoList
  const data = toDoList.taskList
  const fields = toDoList.getOrderedFields()
  useEffect(() => {
    toDoList.updateData()
    console.log('toDoList use')
  }, [1])
  return (
    <div>
      <DataGrid data={data} fields={fields} newItemPage={PAGENAMENEWTASK} />
    </div>
  )
}

export default withStore(toDoList)
