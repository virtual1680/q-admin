import { defineStore } from "pinia";
interface Socket {
	isConnected: boolean;
	message: string;
	reconnectError: boolean;
	heartBeatInterval: number;
	heartBeatTimer: number | null;
}
interface State {
	socket: Socket;
}
export const useStore = defineStore("websocket", {
	state: (): State => ({
		socket: {
			// 连接状态
			isConnected: false,
			// 消息内容
			message: "",
			// 重新连接错误
			reconnectError: false,
			// 心跳消息发送时间
			heartBeatInterval: 50000,
			// 心跳定时器
			heartBeatTimer: null
		}
	}),
	getters: {
		getSocketConnected(state) {
			return state.socket.isConnected;
		},

		getSocketMessage: state => state.socket.message,

		getIsConnected() {
			return this.getSocketConnected;
		}
	},
	actions: {}
});
