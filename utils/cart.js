const util = require('./util.js');
const api = require('./api.js')

/**
 * 获取购物车列表
 */
function getCartList() {
  return new Promise(function (resolve, reject) {
    return util.request(api.wx_cart_list).then(res => {
      if (res.code === 200) {
        //存储购物车列表
        wx.setStorageSync('cart', res.data.lists);
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  })
}

/**
 * 更新购物车选中状态
 */
function setCartCheckbox({ Id }){
  const checkboxIds = wx.getStorageSync('cart_checkbox') || {}
  checkboxIds[Id] = true
  wx.setStorageSync('cart_checkbox', checkboxIds)
}

module.exports = {
  getCartList,
  setCartCheckbox,
}