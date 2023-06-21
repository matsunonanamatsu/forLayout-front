const baseUrl='https://www.matsunonanamatsu.top/'
// const baseUrl='http://192.168.0.178:5001/'
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

function getAllDevice(search_type,search_thing,without){
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
        without:without
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
// function getFile(filename){
//   return new Promise((resolve,reject)=>{
//     wx.request({
//       url: baseUrl+'getFile'+'/static/'+filename,
//       method:'GET',
//       data:{
//         filename:filename
//       },
//       complete:(res)=>{
//         resolve()
//       }
//     })
//   })
// }
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