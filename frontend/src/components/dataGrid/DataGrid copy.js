import React from 'react'
import PropTypes from 'prop-types'
import DGHead from './DGHead'
import DGRow from './DGRow'
import DGHCol from './DGHCol'
import DGBody from './DGBody'
import DGFild from './DGFild'
import DGTable from './DGTable'
import DGCol from './DGCol'

function DataGrid(props) {
  return (
    <DGTable>
      <DGHead>
        <DGRow>
          <DGHCol>cel1</DGHCol>
          <DGHCol>cel2</DGHCol>
        </DGRow>
      </DGHead>
      <DGBody>
        <DGRow>
          <DGCol>
            <DGFild>12</DGFild>
          </DGCol>
          <DGCol>
            <DGFild>12</DGFild>
          </DGCol>
        </DGRow>
      </DGBody>
    </DGTable>
  )
}

DataGrid.propTypes = {}

export default DataGrid
