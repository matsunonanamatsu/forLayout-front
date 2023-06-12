// pages/inventory/inventory.js
const utils=require('../../utils/utils')
Page({
  data: {
    show:true,
    deviceList:[],
    okList:[],
    ngList:[],
    doneCount:0
  },

  ok(e){
    const targetIndex=e.target.dataset.index
    const changeTarget="deviceList["+targetIndex+"].selected"
    this.setData({
      [changeTarget]:true,
      okList:[...this.data.okList,targetIndex],
      doneCount:this.data.doneCount+1
    })
  },
  ng(e){
    const targetIndex=e.target.dataset.index
    const changeTarget="deviceList["+targetIndex+"].selected"
    this.setData({
      [changeTarget]:true,
      ngList:[...this.data.ngList,targetIndex]
    })
  },
// 关闭弹窗
  onClose(){
    this.setData({
      show:false
    })
  },
  getAllDevice(e){
    utils.getAllDevice('area',e.detail)
    .then(
      (value)=>{
        this.setData({
          deviceList:value
        })
      },
      (reason)=>{
        return wx.showToast({
          title: '数据请求失败，响应代码：'+reason,
        })
      }
    )
  },
  onLoad(options) {

  },
  onReady() {

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