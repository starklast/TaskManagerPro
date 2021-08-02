import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'

import Home from '~/pages/Home'
import Reports from '~/pages/Reports'
import Users from '~/pages/Users'
import Login from '~/pages/login'

import {
  itemType,
  REFTYPETASK,
  REFTYPEUSER,
  PAGENAMETASKS,
  PAGENAMETASK,
  PAGENAMENEWTASK,
  PAGENAMEUSERS,
  PAGENAMEUSER,
  PAGENAMENEWUSER,
  PAGENAMELOGIN,
} from '~/common/constant'
import Task from '~/pages/Task'
import User from '~/pages/User'

export const routes = [
  {
    pageName: PAGENAMETASKS,
    title: 'Tasks',
    path: '/',
    icon: <FaIcons.FaTasks />,
    cName: 'navText',
    type: itemType.body,
    component: Home,
    requireAuth: true,
  },
  /* {
    title: 'Reports',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    cName: 'navText',
    type: itemType.body,
    component: Reports,
  }, */
  {
    pageName: PAGENAMEUSERS,
    title: 'Users',
    path: '/users',
    icon: <FaIcons.FaUsers />,
    cName: 'navText',
    type: itemType.body,
    component: Users,
    requireAuth: true,
  },
  /* {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'navText',
    type: itemType.body,
  }, */
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'navText',
    type: itemType.body,
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'navText',
    type: itemType.footer,
  },
  {
    pageName: PAGENAMETASK,
    title: 'TaskView',
    path: '/task/:id',
    component: Task,
    type: null,
    requireAuth: true,
  },
  {
    pageName: PAGENAMENEWTASK,
    title: 'NewTask',
    path: '/task/',
    component: Task,
    type: null,
    requireAuth: true,
  },
  {
    pageName: PAGENAMENEWUSER,
    title: 'NewUser',
    path: '/user/',
    component: User,
    type: null,
    requireAuth: true,
  },
  {
    pageName: PAGENAMEUSER,
    title: 'UserView',
    path: '/user/:id',
    component: User,
    type: null,
    requireAuth: true,
  },
  {
    pageName: PAGENAMELOGIN,
    title: 'login',
    path: '/login',
    component: Login,
    type: itemType.body,
  },
]
export const getPathByName = (name) => {
  let pathItem = routes.find((item) => item.pageName == name)
  if (!pathItem) {
    pathItem = routes.find((item) => item.pageName == PAGENAMETASKS)
  }
  return pathItem.path
}

export const getPathByRefType = (refType) => {
  switch (refType) {
    case REFTYPETASK:
      return getPathByName(PAGENAMETASK)
    case REFTYPEUSER:
      return getPathByName(PAGENAMEUSER)
    default:
      return getPathByName(PAGENAMETASKS)
  }
}
