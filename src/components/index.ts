import { App } from 'vue';
// * svg 图标
import SVG from './icon-svg/index.vue';
// * 子窗口容器
import basicContainer from './basic-container/main.vue';
import basicBlock from './basic-block/main.vue';
// * 数据大屏容器
import ScreenContainer from './data-v/screen-container/main.vue';
const component = {
	install(app: App<Element>) {
		app.component('VueSvg', SVG);
		app.component('BasicContainer', basicContainer);
		app.component('BasicBlock', basicBlock);
		app.component(ScreenContainer.name, ScreenContainer);
	}
};
export default component;
