export default () => {
	return {
		height: 'auto',
		calcHeight: 80,
		translate: false,
		searchLabelWidth: 100,
		excelBtn: true,
		labelWidth: 110,
		selection: true,
		tip: false,
		index: true,
		align: 'center',
		headerAlign: 'center',
		border: true,
		stripe: true,
		column: [
			{ label: '姓名', searchLabel: 'kkk', prop: 'name', search: true },
			{
				label: '状态',
				prop: 'status',
				type: 'select',
				dicData: [
					{ label: '不正常', value: 0 },
					{ label: '正常', value: 1 }
				],
				search: true
			},
			{
				label: '性别',
				prop: 'sex',
				type: 'select',
				dicData: [
					{ label: '男', value: 0 },
					{ label: '女', value: 1 }
				],
				search: true
			},
			{
				label: '创建时间',
				type: 'datetime',
				searchRange: true,
				search: true,
				startPlaceholder: '开始时间',
				endPlaceholder: '结束时间',
				format: 'YYYY-MM-DD HH:mm:ss',
				valueFormat: 'YYYY-MM-DD HH:mm:ss',
				prop: 'queryTime',
				addDisplay: false,
				editDisplay: false,
				hide: true
			}
		]
	};
};
