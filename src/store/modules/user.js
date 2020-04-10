const user = {
  namespaced: true,
  state: {
    isAuthenticated:  false, //是否授权
    user:  {}, //当前用户信息
    openid:'',
    lessonInfo:[], //给当前用户推荐的课程
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_AUTHENTICATED(state, payload) {
      state.isAuthenticated = payload;
    },
    SET_OPENID(state, payload) {
      state.openid = payload;
    },
    SET_LESSONINFO(state, payload) {
      state.lessonInfo = payload;
    },
  },
  actions: {
    setUser: ({commit}, data) => {
      commit('SET_USER', data);
    },
    setAuthenticated: ({commit}, data) => {
      commit('SET_AUTHENTICATED', data);
    },
    setOpenid: ({commit}, data) => {
      commit('SET_OPENID', data);
    },
    setLessonInfo: ({commit}, data) => {
      commit('SET_LESSONINFO', data);
    },
  },
  getters: {}
};

export default user;
