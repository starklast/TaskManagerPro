import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { RiEdit2Line } from 'react-icons/ri'

import DGFildMenu from './DGFildMenu'

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

  let arrComponents = []
  if (field.menu) {
    arrComponents.push(<DGFildMenu key='menu' field={field} data={data} />)
  }
  switch (field.referenceType) {
    case USERS:
      if (!dataFild) {
        break
        //return <></>
      }
      arrComponents.push(
        <User key='data' userId={dataFild} ownerPage={ownerPage} />
      )
      break
    //return <User userId={dataFild} ownerPage={ownerPage} />

    default:
      switch (field.refitem) {
        case true:
          arrComponents.push(
            <span key='data' className={classes}>
              <Link
                to={getPathByRefType(field.refitemtype).replace(
                  /:id/,
                  '' + data[ID]
                )}
                className='data'
              >
                {!dataFild ? '[empty]' : dataFild}
              </Link>
              {/* <RiEdit2Line className={'btn btn-edit'} /> */}
            </span>
          )
          break
        default:
          switch (field.type) {
            case TYPE_ENUM:
              arrComponents.push(
                <span key='data' className={classes}>
                  {field.values[dataFild]}
                </span>
              )
              break
            case TYPE_DATETIME:
              arrComponents.push(
                <span key='data' className={classes}>
                  {dataFild && new Date(dataFild).toLocaleDateString()}
                </span>
              )
              break
            default:
              switch (field.key) {
                case TITLE:
                  classes = classNames('title', classes)
                  arrComponents.push(
                    <span key='data' className={classes}>
                      {dataFild}
                      <RiEdit2Line className={'btn btn-edit'} />
                    </span>
                  )
                  break

                default:
                  arrComponents.push(
                    <span key='data' className={classes}>
                      {short &&
                      typeof dataFild == 'string' &&
                      dataFild.length > 20
                        ? dataFild.slice(0, 20) + '...'
                        : dataFild}
                    </span>
                  )
                  break
              }
          }
      }
  }
  return arrComponents
}

DGFild.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default withStore(DGFild)
