import { RequestMethod } from '@cocker/core/http'

export const userController = {
  login: {
    controller: 'business-service/api/login',
    action: 'login',
    type: RequestMethod.Post
  },
  register: {
    controller: 'user',
    action: 'register',
    type: RequestMethod.Post
  },
  getUserList: {
    controller: 'user',
    action: 'getUserList',
    type: RequestMethod.Get
  },
  updateUserState: {
    controller: 'user',
    action: 'updateUserState',
    type: RequestMethod.Get
  },
  updateAdminState: {
    controller: 'user',
    action: 'updateAdminState',
    type: RequestMethod.Get
  },
  resetPassword: {
    controller: 'user',
    action: 'resetPassword',
    type: RequestMethod.Get
  },
  authUser: {
    controller: 'user',
    action: 'authUser',
    type: RequestMethod.Get
  },
  queryUser: {
    controller: 'user',
    action: 'queryUser',
    type: RequestMethod.Get
  }
}