// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    areaArr2:['AC车间','DC车间','DC转子','YC车间','浸漆房','水溶剂浸漆室','完成室','二楼事务所'],
    areaArr3:['室外ODM','小型ODM','模具室','3#工厂3楼'],
    areaArr5:['大型ODM','PMG','双色PMG','冲压','保全室','5工厂其他'],
    pageTo:''
  },
  // 事件处理函数

  onLoad(e) {
    this.setData({
      pageTo:e.type
    })
  }
})
