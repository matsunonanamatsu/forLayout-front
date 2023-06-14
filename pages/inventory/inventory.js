// pages/inventory/inventory.js
const utils=require('../../utils/utils')
Page({
  data: {
    show:true,
    deviceList:[],
    okList:[],
    ngList:[],
    startX:0,
    endX:0
  },
  ok(e){
    const targetIndex=e.target.dataset.index
    const changeSelected="deviceList["+targetIndex+"].selected"
    const changeGetOut="deviceList["+targetIndex+"].getout"
    // 先隐藏getout触发退场效果
    this.setData({
      [changeGetOut]:true,
      okList:[...this.data.okList,targetIndex],
      doneCount:this.data.doneCount+1
    })
    // 再隐藏本体
    setTimeout(()=>{
      this.setData({
        [changeSelected]:true
      })
    },250)
  },
  ng(e){
    const targetIndex=e.target.dataset.index
    const changeSelected="deviceList["+targetIndex+"].selected"
    const changeGetOut="deviceList["+targetIndex+"].getout"
    // 先隐藏getout触发退场效果
    this.setData({
      [changeGetOut]:true,
      ngList:[...this.data.ngList,targetIndex],
      doneCount:this.data.doneCount+1
    })
    // 再隐藏本体
    setTimeout(()=>{
      this.setData({
        [changeSelected]:true
      })
    },300)
  },
// 关闭弹窗
  onClose(){
    this.setData({
      show:false
    })
  },
  getAllDevice(e){
    wx.setNavigationBarTitle({
      title: e.detail+'盘点',
    })
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
  dragend(e){
    const idx=e.target.dataset.idx
        // distance:end-start移动的距离
        const distance=e.detail.scrollLeft
        // position_x：为movable-view定位
        const position_x="deviceList["+idx+"].position_x"
        // 左拉30以上全显示
        switch(true){
          case (distance<=50):
            this.setData({[position_x]:-1000})
            break;
          case (distance>50):
            this.setData({[position_x]:1000})
            break;
        }
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