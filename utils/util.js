// const user = require('./user.js')

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
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('token')
        //'X-Litemall-Token': wx.getStorageSync('token')
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
            // 重新登录
            // user.loginByWeixin()
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

/**
 * 购物车提示
 */
function scanCart(that) {
  // let cart = wx.getStorageSync("cart");
  const cart = [{num: 2}]
  //统计购物车商品的总数量
  let cartnumber = 0; //购物车菜品的一共的数量
  
  for (let index in cart) {
     cartnumber += cart[index].num
  }
  // 没有底部导航栏时，不执行wx.setTabBarBadge方法
  let pages = getCurrentPages()
  if (pages.length) {
    let currPage = pages[pages.length - 1]
    let routes = [
      'pages/my/my',
      'pages/home/home',
      'pages/category/category',
      'pages/shopping/shopping'
    ]
    if(routes.indexOf(currPage.route) === -1){
      return false
    }
  };
  
  if (cart.length) {     //判断购物车的数量个数，购物车如果为空就走else
     wx.setTabBarBadge({ //购物车不为空 ，给购物车的tabar右上角添加购物车数量标志
        index: 2,				 //标志添加位置
        text: "" + cartnumber + ""	//通过编译，将购物车总数量放到这里
     })
  } else {//购物车为空
     wx.removeTabBarBadge({ //移除指定位置的tabbar右上角的标志
        index: 2,
     })
  }
}

module.exports = {
  formatTime: formatTime,
  request,
  scanCart
}
