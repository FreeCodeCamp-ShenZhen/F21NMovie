//index.js
//获取应用实例
var Zan = require('../../zanui/index');
import movieList from '../../common/movieList/index';
import Bottom from '../../common/bottom/index';

console.log(movieList)
const app = getApp()

Page(Object.assign({}, Zan.Tab, movieList, Bottom,{
  data: {
    navs: [{
      icon: 'libra',
      name: '排行'
    }, {
      icon: 'home',
      name: '首页'
    }, {
        icon: 'favorite',
        name: '收藏'
      },],
    active: 'home',
    loading: true,
    tab: {
      scroll: true,
      list: [{
          id: 'in_theaters',
          title: '新片上映'
      }, {
          id: 'coming_soon',
          title: '即将上映'
        }, {
          id: 'us_box',
          title: '北美票房榜'
      },{
          id: 'top250',
          title: 'Top250'
        }
      ],
      selectedId: 'in_theaters',
      popup: false
    },
    mList: [],
    count:9,
    saveCount: 9,
    start: 0,
    total: 0,
    loadBar: false,
    top: 0
  },
  onLoad: function () {
    app.dbMovieRequest(`in_theaters?count=${this.data.count}&start=${this.data.start}`).then((res)=>{
      this.setData({
        loading: false,
        mList: res.subjects,
        total: res.total,
        loadBar: true
      })
    })
  },
  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;
    this.setData({
      [`${componentId}.selectedId`]: selectedId,
      loading: true,
      start: 0,
      top: 0,
      isRequest: false,
      count: this.data.saveCount,
      selectedId: selectedId,
      loadBar: false,
      mList: []
    })
    app.dbMovieRequest(`${selectedId}?count=${this.data.count}&start=${this.data.start}`).then((res) => {
      let mList = [];
      if (res.subjects[0].subject){
        res.subjects.forEach(val =>{
          mList.push(val.subject);
        })
      }else{
        mList = res.subjects;
      }
      console.log(mList);
      if (this.data.selectedId === selectedId){
        this.setData({
          loading: false,
          mList: mList,
          loadBar: res.total ? true : false,
          total: res.total,
        })
      }
    })
  },
  scrollBottom(e){
    const start = this.data.start + this.data.count;

    // 一旦没有加载条就不加载
    if (!this.data.loadBar) return false;
    // 一旦没有总额就不加载
    if (!this.data.total) return false;

    if ((start + this.data.count)> this.data.total){
      const count = this.data.total - start;
      this.setData({
        loadBar: false,
        count: count
      })
    }
    this.setData({
      start: this.data.start + this.data.saveCount
    })
    app.dbMovieRequest(`${this.data.selectedId || 'in_theaters'}?count=${this.data.count}&start=${this.data.start}`).then((res) => {
      let mList = this.data.mList;

      if (res.subjects[0].subject) {
        res.subjects.forEach(val => {
          mList.push(val.subject);
        })
      } else {
        mList = mList.concat(res.subjects);
      }
      console.log(mList);
      this.setData({
        loading: false,
        mList: mList,
        isRequest: false
      })
    })
  },
  activeBottom(e){
    this.setData({
      active: e.id
    })
  },
  goMovieDetail(e){
    this.togglePopup();
    app.dbMovieRequest(`/subject/${e}`).then(res=>{
      console.log(res);
    })
  },
  togglePopup(){
    this.setData({
      popup: !this.data.popup
    })
  }
}))
