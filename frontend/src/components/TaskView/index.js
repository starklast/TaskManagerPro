import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import withStore from '~/hocs/withStore'
import styles from './app.module.css'
import Input from '~/common/components/Input'
import Button from '~/common/components/Button'
import { getPathByName } from '~/routes'
import InputWithLable from '~/common/components/InputWithLable'
function TaskView({ id, stores }) {
  const [data, setData] = useState({})
  const [fields, setFields] = useState([])
  const taskList = stores.toDoList
  useEffect(() => {
    taskList.get(id).then((data) => {
      setData(data)
      setFields(data.getOrderedFields())
    })
  }, [id])
  return (
    <>
      {fields.length > 0 && (
        <>
          {fields.map((field) => {
            return (
              <div key={field.key}>
                <InputWithLable
                  lable={field.title}
                  value={data[field.key]}
                  onChange={(value) => {
                    const newData = { ...data }
                    newData[field.key] = value
                    setData(newData)
                  }}
                  readOnly={field.readonly}
                />
              </div>
            )
          })}
          <Link to={getPathByName('Home')}>
            <button
              onClick={() => {
                data.update(data)
              }}
            >
              Confirm
            </button>
            <button onClick={() => {}}>Cancel</button>
          </Link>
        </>
      )}
    </>
  )
}

TaskView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stores: PropTypes.object,
}

export default withStore(TaskView)
