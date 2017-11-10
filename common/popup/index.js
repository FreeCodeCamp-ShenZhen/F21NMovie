const Popup = {
  _favorite(){
    if (this.favorite){
      this.favorite();
    }else{
      console.warn('缺少 favorite 方法！');
    }
  }
}

module.exports = Popup;