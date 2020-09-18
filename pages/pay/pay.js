// pages/pay/pay.js
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    address: {}, // 地址
  },

  // 购物车列表及选择中值
  getCartList: function() {
    const cart = wx.getStorageSync("cart") || [];
    const checkedIds =  wx.getStorageSync('cart_checkbox') || {}
    const list = []
    cart.forEach(item => {
      if(checkedIds[item.GoodsId]){
        list.push(item)
      }
    })
    this.setData({ list })
  },

  // 地址
  getAddressList: function(){
    wx.showLoading({
      title: '正在加载...',
    })
    util.request(api.wx_address_list).then(res => {
      if (res.data && res.data.lists){
        this.setData({
          address: res.data.lists.find(item => item.Status === 1) || {},
        })
      }
      console.log('11', this.data.address)
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  },

  onSubmit: function(){
    const { address } = this.data
    if(address.Status === 1){
      this.wxPay()
    }else {
      wx.navigateTo({url: '/pages/address/address'})
    }
  },

  wxPay: function(){
    // 发起支付
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      fail: function (aaa) {
        console.error(aaa)
        wx.showToast({
          title: '支付失败:' + aaa,
          icon: 'none'
        })
      },
      success: function () {
        // 提示支付成功
        wx.showToast({
          title: '支付成功',
          icon: 'none'
        })
        wx.redirectTo({
          url: '/'
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCartList()
    // this.getAddressList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAddressList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})