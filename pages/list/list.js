// pages/list/list.js
const utils=require('../../utils/utils')
Page({
  data: {
    search_thing:'',
    count:0,
    deviceList:[],
    page:1
  },
  onLoad(options) {
    this.setData({
      search_thing:options.title
    })
    this.getSet()
  },
  // 一套getCount+getDevcie的组合拳
  async getSet(){
    await utils.getCount('area',this.data.search_thing)
    .then(
      (value)=>{
        this.setData({
          count:value
        })
        if(this.data.count===0){
          return new Promise(()=>{
            wx.showToast({
              title: '暂无该车间数据',
              icon:'error'
            })
          }) 
        }
      },
      (reason)=>{
        return wx.showToast({
          title: '数据请求失败，响应代码：'+reason,
          icon:'none'
        })
      }
    )
    await utils.getDevice('area',this.data.search_thing,this.data.page)
    .then(
      (value)=>{
        this.setData({
          deviceList:[...this.data.deviceList,...value]
        })
      },
      (reason)=>{
        return new Promise(()=>{
          wx.showToast({
            title: '数据请求失败，响应代码:'+reason,
            icon:'none'
          })
        })
      }
    )
  },
  getDevice(){
    utils.getDevice('area',this.data.search_thing,this.data.page)
    .then(
      (value)=>{
        this.setData({
          deviceList:[...this.data.deviceList,...value]
        })
      },
      (reason)=>{
        return wx.showToast({
          title: '数据请求失败，响应代码:'+reason,
          icon:'none'
        })
      }
    )
  },
  onReachBottom(){
    if(this.data.count<=10) return
    if(this.data.page>=this.data.count/10){
      return wx.showToast({
        title: '已经到底啦',
        icon:'none'
      })
    }
    this.setData({
      page:this.data.page+1
    })
    this.getDevice()
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.title
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})