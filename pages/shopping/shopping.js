// pages/shopping/shopping.js
const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    screenWidth: app.globalData.screenWidth,
    cartList: [1,2,3],
    checked: true,
  },

  onClick: function() {
    wx.switchTab({
      url: `/pages/home/home`,
    })
  },

  // 推荐
  getSellList: function () {
    util.request(api.wx_hot_sell).then(res => {
      if (res.data && res.data.lists ) {
        this.setData({ list: res.data.lists })
      }
    })
  },

  // 全选
  onCheckAll: function (e) {
    this.setData({checked: e.detail})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSellList()
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