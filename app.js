//app.js
const util = require('./utils/util.js')
const user = require('./utils/user')
const cart = require('./utils/cart')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // user.loginByWeixin()
    user.loginTestToken().then(res => {
      // 获取购物车列表
      cart.getCartList()
    }).catch(err => {
      console.log('获取token失败！')
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('userInfo', res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //初始化购物车
    this.timer = setInterval(function () {
      // that.scanCart(that)
      util.scanCart()
    }, 1000);
  },
  globalData: {
    userInfo: null,
    screenWidth: wx.getSystemInfoSync()['windowWidth'],
  }
})