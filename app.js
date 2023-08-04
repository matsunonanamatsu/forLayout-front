// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // wx.getSystemInfo({
    //   success:(res)=>{
    //     console.log(res.environment)
    //     this.globalData.environment=res.environment
    //   }
    // })

    // wx.login({
    //   success: res => {
    //     console.log(res)
    //     wx.request({
    //       url:' https://api.weixin.qq.com/wxa/getpluginopenpid',
    //       method:'POST',
    //       data:{
    //         access_token:'wxf2a457db04809d31',
    //         secret:'79ffc1cb8b0e27986f2febc779bc8342'},
    //       success:(res)=>{
    //         console.log(res)
    //       }
    //     })
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    environment:''
  }
})
