import { App } from 'vue';
import SVG from './icon-svg/index.vue';
const component = {
	install(app: App<Element>) {
		app.component('VueSvg', SVG);
	}
};
export default component;
