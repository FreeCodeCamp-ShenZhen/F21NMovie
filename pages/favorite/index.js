// pages/love/index.js
//index.js
//获取应用实例
import movieList from '../../common/movieList/index';
import Bottom from '../../common/bottom/index';
import Popup from '../../common/popup/index';
Page(Object.assign({}, movieList, Bottom, Popup,{
  data: {
    navs: [{
      icon: 'libra',
      name: '排行'
    }, {
      icon: 'type',
      name: '分类'
    }, {
      icon: 'favorite',
      name: '收藏'
    },],
    active: 'favorite',
    mList: [],
    movieList: [],
    top: 0,
    popup: false
  },
  onLoad: function (options) {

  },
  activeBottom(e) {
    this.setData({
      active: e.id
    })
    console.log(e.id)
    wx.switchTab({
      url: `../${e.id}/index`
    })
  },
  goMovieDetail(e) {
    console.log(e);
    
    const movieList = this.data.movieList.filter((val, index) => {
      if (e === val.id) {
        this.setData({
          movieIndex: index
        })
        return val;
      }
    })
    // console.log(movieList);
    
    this.togglePopup();
    this.setData({
      movie: movieList[0]
    })
    return false;
  },
  togglePopup() {
    this.setData({
      popup: !this.data.popup
    })
  },
  favorite() {
    let movie = this.data.movie;
    let movieList = this.data.movieList;
    movie.favorite = !movie.favorite;
    movieList[this.data.movieIndex].favorite = movie.favorite;

    movieList = movieList.filter(val => {
      if (val.favorite) return val;
    });

    this.setData({
      movie: movie,
      movieList: movieList
    })
  },
  
  onShow: function () {
    let movieList = wx.getStorageSync('Old') || [];
    movieList = movieList.filter(val => {
      if (val.favorite) return val;
    });
    this.setData({
      movieList: movieList,
      top: 0,
      popup: false
    })
  },
  onHide: function () {
    wx.setStorage({
      key: "Old",
      data: this.data.movieList
    })

    this.setData({
      popup: false
    })
  }
}))