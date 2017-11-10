const movieList = {
  _goMovieDetail(e){
    if (this.goMovieDetail){
      var id = e.currentTarget.dataset.id;
      console.log('movieId:',id);
      this.goMovieDetail(id);
    }else{
      console.warn('页面缺少 goMovieDetail 回调函数');
    }
  },
  _scrollBottom(e){
    if (this.scrollBottom) {
      if (this.data.isRequest){
        return true;
      }
      this.scrollBottom(e);
      this.setData({
        isRequest: true
      })
    } else {
      console.warn('页面缺少 scrollBottom 回调函数');
    }
  }
}
export default movieList;