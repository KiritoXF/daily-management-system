import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import VueResource from 'vue-resource';
import Chart from 'vue-chartjs';
import EChart from 'echarts';
// import VueI18n from 'vue-i18n'
import 'iview/dist/styles/iview.css';

// vue 拖拽插件
import {
    ContainerMixin,
    ElementMixin
} from 'vue-slicksort';

Vue.use(ContainerMixin);
Vue.use(ElementMixin);

// Bus 总线
const Bus = new Vue();


Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueResource);
Vue.use(Chart);
Vue.use(EChart);

// Vue.use(VueI18n)

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    data: {
        Bus
    },
    router: router,
    render: h => h(App)
});