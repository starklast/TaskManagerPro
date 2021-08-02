import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { RiEdit2Line } from 'react-icons/ri'
import withStore from '~/hocs/withStore'
import { TITLE, USERS, ID, TYPE_ENUM, TYPE_DATETIME } from '~/common/constant'
import User from '~/components/User'
import { getPathByName, getPathByRefType } from '~/routes'
import './styles.css'
function DGFild({
  children,
  className,
  field,
  data,
  short,
  ownerPage,
  ...props
}) {
  let classes = classNames('fild', className)
  const dataFild = data[field.key]
  switch (field.referenceType) {
    case USERS:
      return <User userId={dataFild} ownerPage={ownerPage} />

    default:
      switch (field.refitem) {
        case true:
          return (
            <span className={classes}>
              <Link
                to={getPathByRefType(field.refitemtype).replace(
                  /:id/,
                  '' + data[ID]
                )}
                className='data'
              >
                {dataFild}
              </Link>
              {/* <RiEdit2Line className={'btn btn-edit'} /> */}
            </span>
          )

        default:
          switch (field.type) {
            case TYPE_ENUM:
              return <span className={classes}>{field.values[dataFild]}</span>
            case TYPE_DATETIME:
              return (
                <span className={classes}>
                  {dataFild && dataFild.toLocaleDateString()}
                </span>
              )
            default:
              switch (field.key) {
                case TITLE:
                  classes = classNames('title', classes)
                  return (
                    <span className={classes}>
                      {dataFild}
                      <RiEdit2Line className={'btn btn-edit'} />
                    </span>
                  )

                default:
                  return (
                    <span className={classes}>
                      {short &&
                      typeof dataFild == 'string' &&
                      dataFild.length > 20
                        ? dataFild.slice(0, 20) + '...'
                        : dataFild}
                    </span>
                  )
              }
          }
      }
  }
}

DGFild.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default withStore(DGFild)
