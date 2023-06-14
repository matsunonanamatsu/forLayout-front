// components/selectArea/selectArea.js
const utils=require('../../utils/utils')
Component({
  properties: {

  },
  data: {
    areaList:[['2#工厂','3#工厂','5#工厂'],['AC车间','DC车间','YC车间','DC转子','浸漆房','完成室','水溶性浸漆房']],
    multiIndex:[0,0],
    index:-1,
    search_thing:''
  },
  methods: {
    // 列变动时触发，如果动的不是父列则return
    factoryChange(e){
      if(e.detail.column!==0) return
      // 根据父列为子列赋值
      switch(e.detail.value){
        case 0:
          this.setData({
            "areaList[1]":['AC车间','DC车间','YC车间','DC转子','浸漆房','完成室','水溶性浸漆房']
          })
          break;
        case 1:
          this.setData({
            "areaList[1]":['室外ODM','小型ODM','模具室']
          })
          break;
        case 2:
          this.setData({
            "areaList[1]":['大型ODM','PMG','双色PMG','冲压','保全室']
          });
        break;
      }
    },
    // 选择完毕后为index赋值以便根据areaList找到选择值
    areaChange(e){
      this.setData({
        index:e.detail.value[1],
      })
    },
    // 确认后将选择的值传给父组件inventory
    getDevice(){
      if(this.data.index===-1){
        return wx.showToast({
          title: '请选择本次盘点的职场',
          icon:'none'
        })
      }
      const search_thing=this.data.areaList[1][this.data.index]
      this.triggerEvent('getAllDevice',search_thing)
      this.triggerEvent('onClose')
    }
  }
})
