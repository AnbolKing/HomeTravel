import store from 'store';
const USER_STORAGE = 'user_storage';

export default {
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
  }
}