import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import withStore from '~/hocs/withStore'
import { getPathByName } from '~/routes'
import { ID, PAGENAMEUSER, NAME } from '~/common/constant'

function User({ userId, ownerPage, ...props }) {
  const usersStore = props.stores.users

  let userInfo = usersStore.get(userId)
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

export default withStore(User)
