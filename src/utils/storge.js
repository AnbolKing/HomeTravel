import store from 'store';
const USER_STORAGE = 'user_storage';
const TOKEN_STORAGE = 'token_storage';
const USER_NAME = 'user_name';

export default {
/* 关于 User 的账号密码存储 */
  //保存user
  saveUser(user) {
    store.set(USER_STORAGE,user);
  },
  //读取user
  getUser() {
    return store.get(USER_STORAGE) || {};
  },
  //删除user
  removeUser() {
    store.remove(USER_STORAGE);
  },
/* 关于 User 的token存储 */
  saveToken(token) {
    store.set(TOKEN_STORAGE,token);
  },
  getToken() {
    return store.get(TOKEN_STORAGE) || {}; 
  },
  removeToken() {
    store.remove(TOKEN_STORAGE);
  },
/* 关于 User 的token存储 */
  saveName(name) {
    store.set(USER_NAME,name);
  },
  getName() {
    return store.get(USER_NAME) || {}; 
  },
  removeName() {
    store.remove(USER_NAME);
  }
}