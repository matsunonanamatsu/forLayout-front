// pages/drag/drag.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    wdHeight:0,
    wdWidth:0,
    disabled:false,
    list:[
      {id:1,img:'/static/basket.png',x:30,y:30,type:"成型机",selected:false},
      {id:2,img:'/static/delete.png',x:0,y:0,type:"电检机",selected:false},
      {id:3,img:'/static/edit.png',x:0,y:0,type:"卷线机",selected:true},
      {id:4,img:'/static/lock.png',x:0,y:0,type:"打pin机",selected:false},
      {id:5,img:'/static/menu.png',x:0,y:0,type:"组立机",selected:false},
      {id:6,img:'/static/ping.png',x:0,y:0,type:"成型机",selected:true}
    ]
  },
  // 关闭弹出层
  onClose(){
    this.setData({
      show:false
    })
  },
  // 拖动时处理数据
  drag(e){
    this.setData({
    })
  },
  // 进入编辑模式时启用拖动
  toEdit(){
    this.setData({
      disabled:false
    })
  },
  // 退出编辑模式时禁用拖动
  exitEdit(){
    this.setData({
      disabled:true
    })
  },
  // 点击新增设备时弹出弹出层那个
  addDevice(){
    this.setData({
      show:true
    })
  },

  onLoad(options) {
    wx.getSystemInfo({
      success:(res)=>{
        this.setData({
          wdHeight:res.windowHeight,
          wdWidth:res.windowWidth
        })
      }
    })
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