/*
 * @Author: qinhongyang virtual1680@gmail.com
 * @Date: 2022-09-19 16:58:59
 * @LastEditTime: 2022-10-28 14:24:23
 * @Description: 暂无
 */
import { createApp } from 'vue';
import App from 'app/App.vue';
import store from 'store/index';
import router from 'router/index';
import 'virtual:svg-icons-register';
import i18n from './lang/index';
import ElementPlus from 'element-plus';
import Avue from '@smallwei/avue';
import QvVue from 'qv-vue';
import 'qv-vue/theme-chalk/index.css';
import axios from './http/axios';
import componentList from './components';
import './permission';
import error from './error';
import './styles/common.scss';

const app = createApp(App);
app.use(i18n);
app.use(store);
app.use(router);
app.use(componentList);
app.use(error);
app.use(ElementPlus);
app.use(Avue, { axios });
app.use(QvVue, { axios });
app.mount('#app');
