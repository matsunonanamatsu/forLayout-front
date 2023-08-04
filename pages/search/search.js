const utils=require('../../utils/utils')
Page({
  data: {
    deviceList:[],
    search_type:'sap_number',
    search_thing:'',
    count:0
  },
  //键盘搜索键or查询图标点击触发 
  matchDevice(){
    this.setData({
      deviceList:[]
    })
    if(this.data.search_thing.length===0){
      return wx.showToast({
        title: '输入框不可为空',
        icon:'none'
      })
    }
    this.getSet()
  },
  // 一套getCount+getDevcie的组合拳
  async getSet(){
    await utils.getCount(this.data.search_type,this.data.search_thing)
    .then(
      (value)=>{
        this.setData({
          count:value
        })
        if(this.data.count===0){
          return new Promise(()=>{
            wx.showToast({
              title: '未匹配到设备',
              icon:'error'
            }) 
          })
        }
      },
      (reason)=>{
        return wx.showToast({
          title: '数据请求失败，错误信息：'+reason,
          icon:'none'
        })
      }
    )
    await utils.getDevice(this.data.search_type,this.data.search_thing,1)
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
  // 触底触发方法
  getDevice(page){
    utils.getDevice(this.data.search_type,this.data.search_thing,page)
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
  //获取输入框内容
  setInput(e){
    this.setData({
      search_thing:e.detail.value
    })
  },
  // 获取查找类型
  getSearchType(e){
    this.setData({
      search_type:e.detail.value
    })
  },
  // 触底请求下一个10条
  onReachBottom(){
    const page=Math.ceil(this.data.deviceList.length/10)
    if(page>=this.data.count/10){
      return wx.showToast({
        title: '已经到底啦',
        icon:'none'
      })
    }
    this.getDevice(page+1)
  },
  onLoad(options) {

  },
  // 设置顶部标题为固定资产查询
  onReady() {
    wx.setNavigationBarTitle({
      title: '固定资产查询',
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})