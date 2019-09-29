// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'expose-loader?jQuery!jquery' // eslint-disable-line
import 'expose-loader?$!jquery' // eslint-disable-line
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueTouch from 'vue-touch';
import Trend from 'vuetrend';

import store from './store';
import router from './Routes';
import App from './App';

import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'; //Vuesax styles
Vue.use(Vuesax);

import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';
Vue.use(Chartkick.use(Chart));

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.use(BootstrapVue);
Vue.use(VueTouch);
Vue.use(Trend);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
	const requiredAuth = to.matched.some(record => record.meta.requiredAuth)
	const login = store.getters['auth/login']

	if(!requiredAuth) {
		if(login && to.path == "/login")
			next('/')
		else
			next()
	} else {
		if(login)
			next()
		else
			next('/login')
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
