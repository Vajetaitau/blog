var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
})

var navigationMenu = new Vue({
  el: '#navigationMenu',
  data: {
    mainMenu: {
      items: [
        {'name': 'xasdasdxasd', 'link': 'aasdasd'},
        {'name': 'asqwe', 'link': 'qweqwe'},
        {'name': 'qqqqq', 'link': 'qqqqqqqqqqqqqq'}
      ]
    }
  }
});