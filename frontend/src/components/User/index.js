import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import withStore from '~/hocs/withStore'
import { getPathByName } from '~/routes'
import { ID, PAGENAMEUSER, NAME } from '~/common/constant'

function User({ userId, ownerPage, ...props }) {
  let userInfo = userId
  //console.log(userInfo)
  /* if (!userInfo) {
    userInfo = {}
    userInfo.name = ''
  } */
  return (
    <span>
      <Link
        to={{
          pathname: getPathByName(PAGENAMEUSER).replace(
            /:id/,
            '' + userInfo[ID]
          ),

          state: { ownerPage: ownerPage },
        }}
      >
        {userInfo[NAME]}
      </Link>
    </span>
  )
}

User.propTypes = {}

export default User
