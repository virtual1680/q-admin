export default [
	{
		url: '/crud/list',
		method: 'get',
		response: () => {
			return {
				msg: '操作成功',
				success: true,
				data: {
					total: 50,
					record: Array(50).fill({
						name: 'small',
						sex: 1,
						status: 0
					})
				}
			};
		}
	},
	{
		url: '/crud',
		method: 'post',
		response: () => {
			return {
				data: {}
			};
		}
	},
	{
		url: '/crud',
		method: 'put',
		response: () => {
			return {
				data: {}
			};
		}
	},
	{
		url: '/crud',
		method: 'delete',
		response: () => {
			return {
				data: {}
			};
		}
	}
];
