// pages/home/home.js
const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_1: [],
    list_2: [],
    list_3: [],
    screenWidth: app.globalData.screenWidth
  },

  getHomeList: function() {
    util.request(api.wx_home).then(res => {
      if (res.data && res.data.lists){
        this.setData({
          list_1: res.data.lists.filter(item => item['GoodsOrder'] === 1),
          list_2: res.data.lists.filter(item => item['GoodsOrder'] === 2),
          list_3: res.data.lists.filter(item => item['GoodsOrder'] === 3),
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomeList()
    console.log('a0', app.globalData.screenWidth)
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