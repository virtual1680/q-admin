import mitt from "mitt";
import { App } from "vue";
const emitter = mitt();

export default {
	install: (app: App) => {
		app.config.globalProperties.$emitter = emitter;
	}
};

/**
 *
 * 跨组件通信
 *
 *
emitter.on('change-msg',(value)=>{
    console.log(value);
})

onUnmounted(()=>{
    emitter.off('change-msg',()=>{

    })
})

emitter.emit('change-msg',123)

 *
 *
 *
 */
