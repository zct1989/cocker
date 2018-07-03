export const userController = {
  login: {
    controller: 'user',
    action: 'login',
    type: 'POST'
  },
  register: {
    controller: 'user',
    action: 'register',
    type: 'POST'
  },
  getUserList: {
    controller: 'user',
    action: 'getUserList',
    type: 'GET'
  },
  updateUserState: {
    controller: 'user',
    action: 'updateUserState',
    type: 'GET'
  },
  updateAdminState: {
    controller: 'user',
    action: 'updateAdminState',
    type: 'GET'
  },
  resetPassword: {
    controller: 'user',
    action: 'resetPassword',
    type: 'GET'
  },
  authUser: {
    controller: 'user',
    action: 'authUser',
    type: 'GET'
  },
  queryUser:{
    controller: 'user',
    action: 'queryUser',
    type: 'GET'
  }
}