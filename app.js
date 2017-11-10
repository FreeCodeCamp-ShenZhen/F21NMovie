//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null
  },
  dbMovieRequest(api){
    var promise = new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.douban.com/v2/movie/${api}`,
        header: {
          'content-type': 'json'
        },
        methods: 'GET',
        success: function (res) {
          if (res.statusCode === 200) {
            res.data.api = api;
            resolve(res.data);
          } else {
            reject(res.errMsg)
          }
        }
      })
    })
    return promise;
  }
})