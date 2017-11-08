const movieList = {
  
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
      console.warn('页面缺少 handleZanTabChange 回调函数');
    }
  }
}
export default movieList;