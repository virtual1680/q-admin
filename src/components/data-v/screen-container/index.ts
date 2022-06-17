import ScreenContainer from "./main.vue";
import { App } from "vue";
export default {
	install(app: App) {
		console.log(ScreenContainer.name);
		app.component(ScreenContainer.name, ScreenContainer);
	}
};
