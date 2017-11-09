const Bottom = {
  _activeBottom(e){
    const data = {}
    data.id = e.currentTarget.dataset.id;
    if (this.activeBottom){
      this.activeBottom(data)
    }else{
      console.warn('没有activeBottom这个方法');
    }
  }
}

module.exports = Bottom;