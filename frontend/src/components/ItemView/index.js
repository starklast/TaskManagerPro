import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getPathByName } from '~/routes'
import InputWithLable from '~/common/components/InputWithLable'
import { USERS, ID, TYPE_ENUM, TYPE_DATETIME } from '~/common/constant'

import UserSelectInput from '~/components/UserSelectInput'
import EnumSelectInput from '~/components/EnumSelectInput'
function ItemView({ itemData, goBack }) {
  const [data, setData] = useState(itemData)
  const fields = itemData.getOrderedFields()
  useEffect(() => {
    setData(itemData)
  }, [itemData])
  return (
    <>
      {fields.length > 0 && (
        <>
          {fields.map((field) => {
            switch (field.referenceType) {
              case USERS:
                return (
                  <div key={field.key}>
                    <UserSelectInput
                      field={field}
                      userId={data[field.key]}
                      onChenge={(value) => {
                        setData({ ...data, [field.key]: value })
                      }}
                    />
                  </div>
                )

              default:
                switch (field.type) {
                  case TYPE_ENUM:
                    return (
                      <div key={field.key}>
                        <EnumSelectInput
                          field={field}
                          data={data[field.key]}
                          onChenge={(value) => {
                            setData({ ...data, [field.key]: value })
                          }}
                        />
                      </div>
                    )
                  case TYPE_DATETIME:
                    return (
                      <InputWithLable
                        key={field.key}
                        lable={field.title}
                        value={
                          data[field.key] &&
                          new Date(data[field.key]).toLocaleDateString()
                        }
                        onChange={(value) => {
                          const newData = { ...data }
                          newData[field.key] = value
                          setData(newData)
                        }}
                        readOnly={field.readonly}
                      />
                    )
                  default:
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
                }
            }
          })}
          <button
            onClick={() => {
              data.update(data)
              goBack()
            }}
          >
            Confirm
          </button>
          <button onClick={goBack}>Cancel</button>
          <button
            onClick={() => {
              data.delete()
              goBack()
            }}
          >
            Delete
          </button>
        </>
      )}
    </>
  )
}

ItemView.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stores: PropTypes.object,
}
ItemView.defaultProps = {
  goBack: () => {},
}

export default ItemView
