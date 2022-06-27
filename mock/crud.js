export default [{
  url: "/crud/list",
  method: "get",
  response: () => {
    return {
      data: {
        total: 10,
        data: Array(10).fill({
          name: 'small',
          sex: '男'
        }, {
          name: 'small',
          sex: '男'
        })
      }
    }
  }
}, {
  url: "/crud",
  method: "post",
  response: () => {
    return {
      data: {}
    }
  }
}, {
  url: "/crud",
  method: "put",
  response: () => {
    return {
      data: {}
    }
  }
}, {
  url: "/crud",
  method: "delete",
  response: () => {
    return {
      data: {}
    }
  }
}]