import React from 'react'

import { Table } from '@material-ui/core'
import DGHead from './DGHead'
import DGBody from './DGBody'
import DGControlPanel from './DGControlPanel'

function DataGrid({ fields, data, newItemPage, ownerPage }) {
  //let store = props.stores.toDoList

  //const headFields = store.getOrderedFields()
  //const data = store.taskList
  return (
    <>
      <DGControlPanel newItemPage={newItemPage} />
      <Table>
        <DGHead fields={fields} />
        <DGBody data={data} fields={fields} ownerPage={ownerPage} />
      </Table>
    </>
  )
}

DataGrid.propTypes = {}

export default DataGrid
