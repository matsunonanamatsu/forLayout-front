// pages/layout/layout.js
const utils=require('../../utils/utils')
Page({
  data: {
    hidden:true,
    area:'',
    highLight:'',
    thisDevice:1000,
    deviceList:[],
    decorationList:[],
    deviceNow:{
      sap_number:'-',
      device_name:'-',
      area:'-',
      device_type:'-'
    },
    areaInfo:[
      {name:'大型ODM',height:1300,width:2000},
      {name:'DC转子',height:640,width:1870},
      {name:'小型ODM',height:1450,width:1600},
      {name:'AC车间',height:1500,width:2000},
      {name:'DC车间',height:1650,width:2000},
      {name:'YC车间',height:1650,width:2000},
      {name:'室外ODM',height:2300,width:2000},
      {name:'PMG',height:1250,width:1800},
      {name:'浸漆房',height:1700,width:1000},
      {name:'完成室',height:900,width:900},
      {name:'水溶剂浸漆室',height:500,width:1000},
      {name:'冲压',height:1800,width:1500},
      {name:'双色PMG',height:1500,width:1100}
    ],
    areaSize:[{height:0,width:0}]
  },

  getPosition(){
    wx.request({
      url: 'https://www.matsunonanamatsu.top/layout/getPosition',
      // url:'http://192.168.0.178:5002/layout/getPosition',
      method:'GET',
      data:{area:this.data.area},
      success:(res)=>{
        // 将地标和设备分开
        let device=[]
        let decoration=[]
        res.data.forEach((item)=>{
          if(item.device_type==='dibiao'){
            decoration.push(item)
          }else{
            device.push(item)
          }
        })
        this.setData({
          deviceList:device,
          decorationList:decoration
        })
      },
      fail:(err)=>{
        return console.log(err)
      }
    })
  },
  getMsg(e){
    const sap_number=e.target.dataset.sapno
    utils.getDevice('sap_number',sap_number,1).then(
      (value)=>{
        this.setData({
          deviceNow:value[0],
          hidden:false
        })
      },
      (reason)=>{
        wx.showToast({
          title: '请求数据失败，请重试',
          icon:'none'
        })
      }
    )
  },
  closeBox(){
    this.setData({
      hidden:true
    })
  },
  onLoad(options) {
    this.setData({
      area:options.title
    })
    if(options.sap_number){
      this.setData({
        highLight:options.sap_number
      })
    }
    const areaSize=this.data.areaInfo.filter((item)=>{
      return item.name===this.data.area
    })
    this.setData({
      areaSize:areaSize
    })
    this.getPosition()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.area + '布局'
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