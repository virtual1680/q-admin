import { createApp } from 'vue';
import App from 'app/App.vue';
import store from 'store/index';
import router from 'router/index';
import 'virtual:svg-icons-register';
import IconSvg from 'components/icon-svg/index.vue';
import i18n from './lang/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import ScreenContainer from 'components/data-v/screen-container/index';
import basicContainer from 'components/basic-container/main.vue';
import basicBlock from 'components/basic-block/main.vue';
import axios from './http/axios';
import './permission';
import './styles/common.scss';

const app = createApp(App);
//注册全局容器
app.component('BasicContainer', basicContainer);
app.component('BasicBlock', basicBlock);
app.use(store).use(router);
app.use(i18n);
app.component('IconSvg', IconSvg);
app.use(ScreenContainer);
app.use(ElementPlus).use(Avue, { axios });
app.mount('#app');
