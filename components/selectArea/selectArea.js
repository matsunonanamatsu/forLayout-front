// components/selectArea/selectArea.js
const utils=require('../../utils/utils')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    areaList:['AC车间','DC车间','DC转子','YC车间','浸漆房','水溶性浸漆房','完成室','室外ODM','小型ODM','模具室','大型ODM','PMG','双色PMG','冲压','保全室'],
    index:-1,
    search_thing:''
  },
  methods: {
    areaChange(e){
      this.setData({
        index:e.detail.value,
      })
      console.log(this.data.index)
    },
    
    getDevice(){
      if(this.data.index===-1){
        return wx.showToast({
          title: '请选择本次盘点的职场',
          icon:'none'
        })
      }
      const search_thing=this.data.areaList[this.data.index]
      this.triggerEvent('getAllDevice',search_thing)
      this.triggerEvent('onClose')
    }
  }
})
