import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger';
import createPersistedState from "vuex-persistedstate";


//导入模块
import user from "./modules/user";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const createPersisted = createPersistedState({
  storage: {
    getItem: key => wx.getStorageSync.get(key),
    setItem: (key, value) => wx.setStorageSync(key, value),
    removeItem: key => wx.clearStorage()
  }
});
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
  },
  strict: false, //是否可以不通过mutations去修改state数据 //strict
  plugins: debug ? [createLogger(), createPersisted] : [createPersisted],

})
