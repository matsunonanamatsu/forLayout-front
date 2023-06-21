// pages/detail/detail.js
const utils=require('../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_id:'',
    device_name:'',
    deviceMsg:{}
  },

  onLoad(options) {
    this.setData({
      device_id:options.device_id,
      device_name:options.device_name
    })
    this.getThisOne()
  },
  getThisOne(){
    console.log(this.data)
    utils.getAllDevice('id',this.data.device_id,'')
    .then(
      (value)=>{
        this.setData({
          deviceMsg:value[0]
        })
      },
      (reason)=>{
        wx.showToast({
          title: '请求数据失败，响应代码：' +reason,
          icon:'none'
        })
      }
    )
  },
  // 接收list传来的值绑定页面标题
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.device_name
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})