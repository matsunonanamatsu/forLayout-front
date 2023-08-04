const baseUrl='https://www.matsunonanamatsu.top/picture/'
// const baseUrl='http://192.168.0.178:5003/picture/'
// 拉取待上传的固资信息
function getMsg(sap_number){
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '数据请求中'
    })
    wx.request({
      url: baseUrl+'getMsg',
      method:'GET',
      data:{
        sap_number:sap_number
      },
      success:(res)=>{
        if(res.data.length===0) return reject('该固资编号不存在！')
        resolve(res.data)
      },
      fail:(err)=>{
        reject('请求失败,请重试')
      },
      complete:(res)=>{
        wx.hideLoading()
      }
    })
  })
}
// 上传拍摄完毕的照片
function uploadPic(sap_number,picList){
  return new Promise((resolve,reject)=>{
    picList.forEach((item)=>{
      wx.uploadFile({
        filePath: item.picSrc,
        name: sap_number + item.tail,
        url: baseUrl+'uploadPic',
        header:{
          "content-type":"multipart/form-data"
        },
        success:(res)=>{
          resolve(res.data)
        },
        fail:(err)=>{
          return reject('上传失败,请重试')
        }
      })
    })
  })
}

module.exports={
  getMsg:getMsg,
  uploadPic:uploadPic
}