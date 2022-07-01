import { createApp } from 'vue';
import App from 'app/App.vue';
import store from 'store/index';
import router from 'router/index';
import 'virtual:svg-icons-register';
import i18n from './lang/index';
import ElementPlus from 'element-plus';
import Avue from '@smallwei/avue';
import axios from './http/axios';
import componentList from './components';
import './permission';
import error from './error';
import './styles/common.scss';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);
app.use(componentList);
app.use(error);
app.use(ElementPlus);
app.use(Avue, { axios });
app.mount('#app');
