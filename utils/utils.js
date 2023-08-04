const baseUrl='https://www.matsunonanamatsu.top/device/'
// const baseUrl='http://192.168.0.178:5001/'
// 拉取detail中的信息
function getMsg(){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseUrl+'getMsg',
      method:'GET',
      success:(res)=>{
        resolve(res.data)
      },
      fail:(err)=>{
        reject()
      }
    })
  })
}
// 近似匹配-触底更新用
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
// 拉取总数
function getCount(search_type,search_thing){
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '数据请求中',
    })
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
      },
      complete:(res)=>{
        wx.hideLoading()
      }
    })
  })
}
// 匹配全设备-渲染盘点页面用
function getAllDevice(search_type,search_thing,without,page){
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '数据请求中'
    })
    wx.request({
      url: baseUrl+'getAllDevice',
      method:'GET',
      data:{
        search_type:search_type,
        search_thing:search_thing,
        without:without,
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
// 向后端提交盘点结果
function postResults(area,user,okList,ngList){
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '结果提交中'
    })
    wx.request({
      url: baseUrl+'postResults',
      method:'POST',
      data:{
        area:area,
        user:user,
        okList:okList,
        ngList:ngList
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
// 拉取盘点结果文件列表
function getFileList(){
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '获取列表中'
    })
    wx.request({
      url: baseUrl+'getFileList',
      method:'GET',
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
// 下载盘点结果文件
function downloadFile(filename){
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '下载中',
    })
    wx.downloadFile({
      url: baseUrl+'getFile?filename='+filename,
      success:(res)=>{
        wx.openDocument({
          filePath: res.tempFilePath,
          showMenu:true,
          fileType:'xls',
          fail:(err)=>{
            reject('打开文件失败！'+err.errMsg)
          },
          complete:(res)=>{
            wx.hideLoading()
            resolve()
          }
        })
      },
      fail:(err)=>{
        reject('下载文件失败！'+err.errMsg)
      }
    })
  })

}
// 拉取位置信息
function getPosition(area){
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '布局加载中'
    })
    wx.request({
      url: baseUrl+'getPosition',
      method:'GET',
      data:{area:area},
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
// 提交位置信息
function setPosition(sendList){
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '布局信息提交中'
    })
    wx.request({
      url: baseUrl+'setPosition',
      method:'POST',
      data:{sendList:sendList},
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
  getMsg:getMsg,
  getDevice:getDevice,
  getCount:getCount,
  getAllDevice:getAllDevice,
  postResults:postResults,
  getFileList:getFileList,
  // getFile:getFile,
  downloadFile:downloadFile,
  getPosition:getPosition,
  setPosition:setPosition
}