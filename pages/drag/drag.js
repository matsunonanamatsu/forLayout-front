const utils=require('../../utils/utils')
Page({
  data: {
    show:false,
    wdHeight:0,
    wdWidth:0,
    disabled:false,
    list:[]
  },
  // 关闭弹出层
  onClose(){
    this.setData({
      show:false
    })
  },
  // 开始拖动时记录起始点坐标
  touchStart(e){
    const idx=e.target.dataset.idx
    const targetX='list['+idx+'].beforeX'
    const targetY='list['+idx+'].beforeY'
    this.setData({
      [targetX]:e.changedTouches[0].pageX,
      [targetY]:e.changedTouches[0].pageY
    })
  },
  // 结束移动时记录终点坐标
  touchEnd(e){
    const id=e.target.dataset.cid
    const idx=e.target.dataset.idx
    const targetX='list['+idx+'].afterX'
    const targetY='list['+idx+'].afterY'
    this.setData({
      [targetX]:e.changedTouches[0].pageX,
      [targetY]:e.changedTouches[0].pageY
    })
  },
  // 进入编辑模式时启用拖动
  toEdit(){
    this.setData({
      disabled:true
    })
  },
  // 退出编辑模式时禁用拖动，同时提交被移动过的元素
  exitEdit(){
    this.setData({
      disabled:false
    })
    // 如果项目带有beforeX属性则提交
    const sendList=this.data.list.filter((item)=>{
      return item.hasOwnProperty('beforeX')
    })
    utils.setPosition(sendList)
    .then(
      (value)=>{
        wx.showToast({
          title: '提交成功！',
          icon:'none'
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/home/home',
          })
        }, 1000);

      },
      (reason)=>{
        return wx.showToast({
          title: '提交失败，请稍后再试',
          icon:'none'
        })
      }
    )
  },
  // 点击新增设备时弹出弹出层那个

  // 获取设备及position
  getDevicePosition(){
    utils.getPosition('水溶性浸漆房')
    .then(
      (value)=>{
        this.setData({
          list:value
        })
      },
      (reason)=>{
        return wx.showToast({
          title: '请求布局失败',
          icon:'none'
        })
      }
    )
  },
  onLoad(options) {
    this.getDevicePosition()
  },

  onReady() {

  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  onPullDownRefresh() {

  },
  onReachBottom() {

  },
  onShareAppMessage() {

  }
})