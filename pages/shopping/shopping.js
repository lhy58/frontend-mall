// pages/shopping/shopping.js
const app = getApp()
const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
const cart = require('../../utils/cart')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    screenWidth: app.globalData.screenWidth,
    cartList: [],
    checked: false,
    checkedIds: {}, // 选中状态
    priceSum: 0, // 价格总和
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
    const { cartList, checkedIds } = this.data
    cartList.forEach(item => {
      if(e.detail){
        checkedIds[item.Id] = true
      }else {
        checkedIds[item.Id] = false
      }
    })  
    this.setData({checked: e.detail, checkedIds }, function(){
      this.priceSum()
    })
  },

  // 单个选中
  onCheckbox: function(e){
    const { item } = e.target.dataset
    const { checkedIds } = this.data
    
    if(!checkedIds[item.Id]){
      checkedIds[item.Id] = true
    }else {
      checkedIds[item.Id] = false
    }
    this.setData({checkedIds}, function(){
      this.setCheckAll()
      this.priceSum()
    })
  },

  // 联动全选框
  setCheckAll: function(){
    const { checkedIds, cartList } = this.data
    const values = Object.values(checkedIds)
    if(values.length === cartList.length){
      let newChecked = true
      Object.values(checkedIds).forEach(v => {
        if(!v){
          return newChecked = false
        }
      })
      this.setData({checked: newChecked})
    }
  },

  // 求价格总和
  priceSum: function(){
    const { checkedIds, cartList } = this.data
    let sum = 0
    cartList.forEach(item => {
      if(checkedIds[item.Id]){ // 是选中状态
        sum += item.GoodsPriceShop * item.GoodsNumber
      }
    })
    this.setData({priceSum: sum*100})
  },

  // 删除
  onCartDelete: function (e) {
    const _that = this
    const { item } = e.target.dataset
    wx.showModal({
      title: '提示',
      content: '您确定要删除该商品？',
      success (res) {
        if (res.confirm) {
          _that.getDelete(item)
        } else if (res.cancel) {
        }
      }
    })
  },
  // 请求删除
  getDelete: function(item) {
    const { checkedIds } = this.data
    util.request(api.wx_cart_delete, {
      id: item.Id
    }, "GET").then(res => {
      if (res.code === 200 ) {
        wx.showToast({
          title: '删除成功！',
          icon: 'none'
        })
        // 删除对象中选择的属性
        delete checkedIds[item.Id]
        // 刷新购物车
        cart.getCartList().then(res => {
          this.setData({cartList: res.data.lists, checkedIds})
        })
      }else {
        wx.showToast({
          title: '删除失败！',
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '网络错误！',
        icon: 'none'
      })
    })
  },

  // 步数
  onChange: function(e){
    const { item } = e.target.dataset
    util.request(api.wx_cart_edit, {
      id: item.Id,
      goodsNumber: e.detail
    }, 'POST').then(res => {
      if(res.code === 200){
        // 刷新购物车
        cart.getCartList().then(re => {
          this.setData({cartList: re.data.lists}, function(){
            this.priceSum()
          })
        })
      }
    })
  },

  // 购物车列表及选择中值
  getCartList: function() {
    const cart = wx.getStorageSync("cart") || [];
    const checkedIds =  wx.getStorageSync('cart_checkbox') || {}
    console.log('checkedIds', checkedIds)
    console.log('cart', cart)
    if(cart.length > 0){
      this.setData({cartList: cart, checkedIds}, function(){
        this.setCheckAll()
        this.priceSum()
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSellList()
    this.getCartList()
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
    this.getCartList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 更新选中存储值
    wx.setStorageSync('cart_checkbox', this.data.checkedIds)
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