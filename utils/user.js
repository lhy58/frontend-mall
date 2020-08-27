/**
 * 用户的相关服务
 */
const util = require('./util.js');
const api = require('./api.js')


/**
 * promissin 检测 session_key 是否失效
 */
function checkSessoin() {
  // 使用Promise 构造函数
  return new Promise(function (resplve, reject) {
    // 用来检测 用户登录是否失效
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  })
}

/**
 * Promise封装wx.login
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}


/**
 * 调用微信登录
 */
function loginByWeixin(userInfo) {
  return new Promise(function (resolve, reject) {
    return login().then((res) => {
      //登录远程服务器
      util.request(api.wx_auth_login, {
        wxCode: res.code,
        // userInfo: userInfo
      }, 'GET').then(res => {
        if (res === 0) {
          //存储用户信息
          // wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);

          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 调用微信测试登录
 */
function loginTestToken() {
  return new Promise(function (resolve, reject) {
    return login().then((res) => {
      //登录远程服务器
      util.request(api.wx_token, {
        username: "chen",
        password: "123456"
      }, 'POST').then(res => {
        if (res.code === 200) {
          //存储用户信息
          wx.setStorageSync('token', res.data.token);

          resolve(res);
        } else {
          reject(res);
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      reject(false);
    }
  })
}

// 开放出去
module.exports = {
  loginByWeixin,
  checkLogin,
  login,
  loginTestToken,
}