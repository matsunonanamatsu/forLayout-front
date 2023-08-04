const picOnly=require('../../utils/picOnly')
Page({
  data: {
    camera:false,
    sap_number:'',
    deviceMsg:{},
    stepList:[
      {id:1,content:'输入固资编号'},
      {id:2,content:'上传4张照片'},
      {id:3,content:'上传正面照片'}
    ],
    now_idx:0,
    step:1,
    uploadList:[
      {title:'固资编号照片',tail:'_1',picSrc:'/static/add.png'},
      {title:'固资编号场所照片',tail:'_2',picSrc:'/static/add.png'},
      {title:'铭牌照片',tail:'_3',picSrc:'/static/add.png'},
      {title:'设备场所照片',tail:'_4',picSrc:'/static/add.png'},
      {title:'设备正面照片',tail:'',picSrc:'/static/add.png'}
    ]
  },
  // 双向绑定(伪)输入的固资编号
  setInput(e){
    this.setData({
      sap_number:e.detail.value
    })
  },
  // 通过输入的固资编号拉取该设备信息
  matchDevice(){
    picOnly.getMsg(this.data.sap_number).then(
      (value)=>{
        this.setData({
          deviceMsg:value
        })
      },
      (reason)=>{
        wx.showToast({
          title: reason,
          icon:'none'
        })
      }
    )
  },
  // 提交逻辑
  gotoNext(){
    // 不存在固资编号或输入的编号拉取不到信息时
    if(!this.data.sap_number || !this.data.deviceMsg.sap_number){
      return wx.showToast({
        title: '固资编号未输入或不存在',
        icon:'none'
      })
    }
    // 目前处于第2步但除铭牌外的照片未被上传
    if(this.data.step===2){
      for(let i=0;i<4;i++){
        if(i!==2 && this.data.uploadList[i].picSrc==='/static/add.png'){
          return wx.showToast({
            title: '有图片未被上传',
            icon:'none'
          })
        }
      }
    }
    // 目前处于第3步时
    if(this.data.step===3) {
      // 图片未上传时提示
      if(this.data.uploadList[4].picSrc==='/static/add.png'){
        return wx.showToast({
          title: '图片还未上传',
          icon:'none'
        })
      }else{
        // 已上传则直接提交
        return this.submit()
      }
    }
    // 都不是则进入下一步骤
    this.setData({
      step:this.data.step+1
    })
  },
  // 提交至后端
  submit(){
    picOnly.uploadPic(this.data.sap_number,this.data.uploadList).then(
      (value)=>{
        wx.showToast({
          title: value,
          icon:'success'
        })
        this.setData({
          uploadList:[
            {title:'固资编号照片',tail:'_1',picSrc:'/static/add.png'},
            {title:'固资编号场所照片',tail:'_2',picSrc:'/static/add.png'},
            {title:'铭牌照片',tail:'_3',picSrc:'/static/add.png'},
            {title:'设备场所照片',tail:'_4',picSrc:'/static/add.png'},
            {title:'设备正面照片',tail:'',picSrc:'/static/add.png'}
          ],
          deviceMsg:{},
          step:1
        })
      },
      (reason)=>{
        wx.showToast({
          title: reason,
          icon:'error'
        })
      }
    )
  },
  // 传递当前index且调出相机组件
  showCamera(e){
    this.setData({
      now_idx:e.target.dataset.idx,
      camera:true
    })
  },
  // 用拍摄的照片替换原本的+号
  showPhoto(e){
    const changeSrc='uploadList['+this.data.now_idx+'].picSrc'
    this.setData({
      [changeSrc]:e.detail
    })
  },
  // 拍照完或点击《back时隐藏相机组件
  hideCamera(){
    this.setData({
      camera:false
    })
  },
  onLoad(options) {
        // 退出时询问
        wx.enableAlertBeforeUnload({
          message: '确认退出拍照上传流程？'
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: '上传固资图片',
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