const utils=require('../../utils/utils')
Page({
  data: {
    fileList:[]
  },
  downloadFile(e){
    utils.downloadFile(e.target.dataset.filename).then(
      (value)=>{},
      (reason)=>{
        return wx.showToast({
          title: reason,
          icon:'none'
        })
      }
    )
  },
  onLoad(options) {
    utils.getFileList()
    .then(
      (value)=>{
        this.setData({
          fileList:value
        })
      },
      (reason)=>{
        return wx.showToast({
          title: '获取列表失败，请重试',
          icon:'none'
        })
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '固定资产盘点记录',
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