const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封装微信的的request
 */
function request(url, data = {}, method = 'GET') {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json'
        //  'X-Litemall-Token': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.statusCode == 500) {
            // 清除登录相关内容
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            wx.navigateTo({
              url: ''
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.message)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  }).catch((e) => { })   //记住要加上catch 不然在请求的时候报  Uncaught (in promise)
}

module.exports = {
  formatTime: formatTime,
  request
}