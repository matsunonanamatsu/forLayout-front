const { get } = require("mobx-miniprogram")

const baseUrl='http://192.168.0.178:5001/'
function getDevice(search_type,search_thing,page){
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '请求数据中'
    })
    wx.request({
      url: baseUrl+'getDevice',
      method:'GET',
      data:{
        search_type:search_type,
        search_thing:search_thing,
        page:page
      },
      success:(res)=>{
        if(res.statusCode>=200 && res.statusCode<300){
          resolve(res.data)
        }else{
          reject(res.statusCode)
        }
      },
      fail:(err)=>{
        reject(err.errMsg)
      },
      complete:(res)=>{
        wx.hideLoading()
      }
    })
  })
}

function getCount(search_type,search_thing){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseUrl+'getCount',
      method:'GET',
      data:{
        search_type:search_type,
        search_thing:search_thing
      },
      success:(res)=>{
        if(res.statusCode>=200 && res.statusCode<300){
          resolve(res.data)
        }else{
          reject(res.statusCode)
        }
      },
      fail:(err)=>{
        reject(err.errMsg)
      }
    })
  })
}

function getAllDevice(search_type,search_thing){
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '数据请求中'
    })
    wx.request({
      url: baseUrl+'getAllDevice',
      method:'GET',
      data:{
        search_type:search_type,
        search_thing:search_thing
      },
      success:(res)=>{
        if(res.statusCode>=200 && res.statusCode<300){
          resolve(res.data)
        }else{
          reject(res.statusCode)
        }
      },
      fail:(err)=>{
        reject(err.errMsg)
      },
      complete:(res)=>{
        wx.hideLoading()
      }
    })
  })
}
module.exports={
  getDevice:getDevice,
  getCount:getCount,
  getAllDevice:getAllDevice
}