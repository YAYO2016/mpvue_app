import Vue from 'vue'
import App from './App'
import store from './store/index';
import interfaces from './utils/interfaces';
import https from './utils/https';
import utils from './utils/index';

Vue.config.productionTip = false;
//给vue的原型上添加store
Vue.prototype.$store = store;
Vue.prototype.$interfaces = interfaces;
Vue.prototype.$https = https;
Vue.prototype.$utils = utils;

App.mpType = 'app';

const app = new Vue(App)
app.$mount()
