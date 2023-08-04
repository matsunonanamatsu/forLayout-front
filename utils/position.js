const baseUrl='https://www.matsunonanamatsu.top/layout/'
// const baseUrl='http://192.168.0.178:5001/'

function getPosition(area){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseUrl+'getPosition',
      method:'GET',
      data:{
        area:area
      },
      success:(res)=>{
        resolve(res.data)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
module.exports={
  getPosition:getPosition
}