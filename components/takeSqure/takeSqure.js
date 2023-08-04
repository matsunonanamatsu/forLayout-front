// components/takeSqure/takeSqure.js
Component({
  properties: {
    now_idx:0
  },

  /**
   * 组件的初始数据
   */
  data: {
    cameraHeight:[300,750,750,750,750]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    takePhoto(){
      wx.createCameraContext().takePhoto({
        quality:'normal',
        success:(res)=>{
          this.triggerEvent('showPhoto',res.tempImagePath)
          this.triggerEvent('hideCamera')
        }
      })
    },
    hideCamera(){
      this.triggerEvent('hideCamera')
    }
  }
})
