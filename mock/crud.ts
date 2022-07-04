export default [
	{
		url: '/crud/list',
		method: 'get',
		response: () => {
			return {
				msg: '操作成功',
				success: true,
				data: {
					total: 10,
					record: Array(10).fill({
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
