import ScreenContainer from './main.vue';
import { App } from 'vue';
export default {
	install(app: App) {
		app.component(ScreenContainer.name, ScreenContainer);
	}
};
