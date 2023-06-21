// pages/inventory/inventory.js
const utils=require('../../utils/utils')
Page({
  data: {
    show:true,
    user:'',
    area:'',
    count:0,
    deviceList:[],
    okList:[],
    ngList:[],
    idList:[],
    tempArea:[]
  },
  // ok时直接记入okList
  ok(e){
    const target=e.target.dataset.idx
    const changeSelected="deviceList["+target+"].selected"
    const changeGetOut="deviceList["+target+"].getout"
    // 先隐藏getout触发退场效果
    this.setData({
      [changeGetOut]:true,
      okList:[...this.data.okList,e.target.dataset],
      idList:[...this.data.idList,e.target.dataset.id]
    })
    // 再隐藏本体
    setTimeout(()=>{
      this.setData({
        [changeSelected]:true
      })
    },250)
  },
  // ng时调用弹出层询问ng原因
  askWhy(){
    return new Promise((resolve,reject)=>{
      wx.showModal({
        title: '理由',
        editable:true,
        placeholderText: '请输入判定NG的理由',
        complete: (res) => {
          // if (res.cancel) {reject()}
          if (res.confirm) {resolve(res.content)}
        }
      })
    })
  },
  // ng时将id,index和reason记入ngList
  ng(e){
    this.askWhy().then(
      (value)=>{
        const target=e.target.dataset.idx
        const changeSelected="deviceList["+target+"].selected"
        const changeGetOut="deviceList["+target+"].getout"
        // 先隐藏getout触发退场效果
        this.setData({
          [changeGetOut]:true,
          ngList:[...this.data.ngList,{...e.target.dataset,reason:value}],
          idList:[...this.data.idList,e.target.dataset.id]
        })
        // 再隐藏本体
        setTimeout(()=>{
          this.setData({
            [changeSelected]:true
          })
        },250)
      }
    )
    
  },
  // 进入盘点之前查询缓存内是否有该车间的临时保存数据
  judgeStorage(area){
    return new Promise((resolve,reject)=>{
      wx.getStorageInfo({
        success:(res)=>{
          // 如果有,则开启提示询问是否继续上次的盘点
          if(res.keys.includes('pd'+area)){
            wx.showModal({
              title: '提示',
              content: '检测到'+area+'有未完成的盘点，是否继续？',
              complete: (res) => {
                // 取消时清空该车间缓存并要求重新盘点
                if(res.cancel){
                  wx.removeStorage({
                    key: 'pd'+area
                  })
                  return resolve('请重新开始盘点')
                }
                // 确认继续时传递缓存中的okList，ngList和idList
                if (res.confirm) {
                  wx.getStorage({
                    key:'pd'+area,
                    success:(res)=>{
                      console.log('缓存内容',res.data)
                      this.setData({
                        okList:res.data[0],
                        ngList:res.data[1],
                        idList:res.data[2]
                      })
                      resolve('请继续盘点')
                    },
                    fail:(err)=>{
                      reject(err.errMsg)
                    }
                  })
                }
              }
            })
          }else{return resolve()}
        }
      })
    })
  },
  // 临时缓存目前进度
  tempSave(){
    wx.setStorage({
      key:'pd'+this.data.area,
      data:[this.data.okList,this.data.ngList,this.data.idList]
    })
    wx.showToast({
      title: '进度保存成功！',
      icon:'none'
    })
  },
  // 向后端提交本次所有结果
  save(){
    // 盘点数小于设备总数或deviceList未加载时提示不可提交并return
    if(this.data.idList.length<this.data.count || this.data.deviceList.length===0){
      return wx.showToast({
        title: '盘点未完成，不可提交',
        icon:'none'
      })
    }
    // 盘点完成时提交
    utils.postResults(this.data.area,this.data.user,this.data.okList,this.data.ngList)
    .then(
      (value)=>{
        wx.showToast({
          title: value,
          icon:'success'
        })
        // 取消退出页面拦截
        wx.disableAlertBeforeUnload()
        // 清除该车间缓存
        wx.removeStorage({
          key: 'pd'+this.data.area,
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1000)
      },
      (reason)=>{
        return wx.showToast({
          title: '提交数据失败'+reason,
          icon:'error'
        })
      }
    )
  },
// 关闭弹窗
  onClose(){
    this.setData({
      show:false
    })
  },

  // 获取该车间设备及工号渲染页面
  async getAllDevice(e){
    const area=e.detail[0]
    const user=e.detail[1]
    this.setData({
      area:area,
      user:user
    })
    wx.setNavigationBarTitle({
      title: area+'盘点',
    })
    // 先查询缓存
    await this.judgeStorage(area).then(
      (value)=>{
        wx.showToast({
          title: value,
          icon:'none'
        })
      },
      (reason)=>{
        return wx.showToast({
          title: '请求数据失败，请重试',
          icon:'none'
        })
      }
 
    )
    await utils.getCount('area',area)
    .then(
      (value)=>{
        this.setData({
          count:value
        })
      },
      (reason)=>{
        return wx.showToast({
          title: '数据请求失败，响应代码：'+reason,
          icon:'none'
        })
      }
    )
    // 再拉取数据
    await utils.getAllDevice('area',area,this.data.idList)
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
  // 优化拖动
  dragend(e){
    const idx=e.target.dataset.idx
      // distance:end-start移动的距离
      const distance=e.detail.scrollLeft
      // posX：为movable-view定位
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
    // 退出时询问
    wx.enableAlertBeforeUnload({
      message: '盘点尚未完成，是否退出？'
    })
  },
  onReady() {

  },
  onShow() {

  },
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