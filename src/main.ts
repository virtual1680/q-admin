import { createApp } from 'vue';
import App from 'app/App.vue';
import router from 'router/index';
import 'virtual:svg-icons-register';
import IconSvg from 'components/icon-svg/index.vue';

createApp(App).use(router).component('icon-svg', IconSvg).mount('#app');
