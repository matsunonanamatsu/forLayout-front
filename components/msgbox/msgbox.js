// components/msgbox.js
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
    index:-1,
    device_type:'',
    device_name:'',
    sap_number:'',
    type_list:['成型机（小）','成型机（大）','卷线机','电检机']
  },
  /**
   * 组件的方法列表
   */
  methods: {
    submit(){
      wx.request({
        url: 'http://127.0.0.1:5001/addsave',
        method:'POST',
        data:{
          device_name:this.data.device_name,
          device_type:this.data.type_list[this.data.index],
          sap_number:this.data.sap_number
        },
        success:(res)=>{
          console.log(res)
        },
        fail:(err)=>{
          return console.log(err.errMsg)
        },
        complete:(res)=>{
          this.setData({
            device_name:'',
            index:-1,
            sap_number:''
          })
          this.triggerEvent('onClose')
          wx.showToast({
            title: '新增成功！',
          })
        }
      })
    }
  }
})
