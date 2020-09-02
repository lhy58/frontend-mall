// pages/category/category.js
const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
const cart = require('../../utils/cart')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth,
    height: 0,
    tabs: [{
      BorderName: "全部",
      Id: 0
    }],
    list: [],
    active: 0,
    isPage: true,
    page: 1, // 分页
    visible: false,
    infos: {}, // 购物车展示信息
  },

  getSystemInfo: function(){
    const _this = this
    console.log('3434343434')
    wx.getSystemInfo({
      success: function(res){
        console.log('getSystemInfoSync', res)
        _this.setData({ height: res.windowHeight + res.statusBarHeight})
      }
    })
  },

  onSearch: function (e) {
    console.log('text', e.detail)
    wx.navigateTo({
      url: `/pages/search/search?value=${e.detail}`,
    })
  },

  // 分类
  getType: function () {
    util.request(api.wx_category_type).then(res => {
      if(res.data){
        this.setData({ tabs: [].concat(this.data.tabs, res.data)}) 
      }
    })
  },
 
  // 列表
  getList: function () {
    wx.showLoading({
      title: '正在加载...',
    })
    util.request(api.wx_category_list, {
      borderId: this.data.active,
      page: this.data.page,
      pageSize: 10
    }).then(res => {
      console.log('res', res)
      if(res.data && res.data.lists){
        this.setData({ isPage: true, list: [].concat(this.data.list, res.data.lists)})
        if (res.data.total < 10){
          this.setData({ isPage: false})
        }
      }else {
        this.setData({isPage: false})
      }
      wx.hideLoading()
    })
  },

  onScroll: function (e) {
    console.log('--height--', this.data.height)
    console.log('e1111', e)
    const { isPage, height, page } = this.data
    if (isPage && e.detail.isFixed && e.detail.scrollTop > height){
      this.setData({ 
        isPage: false, 
        page: page + 1,
        height: height + e.detail.scrollTop
      }, () => {
        this.getList()
      })
    }
  },

  onChange: function (e) {
    console.log('onChange', e)
    this.getSystemInfo()
    this.setData({ 
      active: e.detail.name, 
      list:[],
      page: 1, 
      isPage: true,
    },()=>{
      this.getList()
    })
  },

  // 购物车弹框
  addCartShow: function(e){
    this.setData({ visible: true, infos: e.detail })
  },

  // 加入购物车
  addCart: function(e){
    const { infos } = this.data
    console.log('infos', infos)
    util.request(api.wx_cart_add, {
      goodsId: infos.Id,
      goodsNumber: e.detail,
    }, 'POST').then(res => {
      if (res.code === 200) {
        wx.showToast({
          title: '添加成功！',
          icon: 'none'
        })
        // 刷新购物车数量
        cart.getCartList()
        // 更新购物车选中状态
        cart.setCartCheckbox(infos)
      }else {
        wx.showToast({
          title: '操作失败！',
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '操作失败！',
        icon: 'none'
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo()
    this.getType()
    this.getList()
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