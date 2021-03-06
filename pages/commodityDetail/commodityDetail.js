// pages/commodityDetail/commodityDetail.js
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
    swiperImages: [], // 轮播内容
    detailImages: [], // 详情图片
    goods: {}, // 商品信息
    show: false,
    visible: false,
    btnType: '',// 1-加入购物车，2-立即购买
    cartNum: 0, // 购物车数量
    naticeList: [
      { title: '权益保障', text: '' },
      { title: '官方正品', text: '官方品牌授权店铺，如有假货，店铺承担责任赔偿' },
      { title: '权益保障', text: '除个别偏远地区，商品全国包邮，如有另外加急需求，与工作人员联系' },
      {title: '权益保障', text: '商品自身问题或运送出现商品损坏，可提出7天退换货'},
    ]
  },

  // 列表
  getDetail: function (id) {
    wx.showLoading({
      title: '正在加载...',
    })
    util.request(api.wx_commodity_detail, {
      id: id,
    }).then(res => {
      if (res.data) {
        this.setData({
          swiperImages: res.data.carouselPictures || [],
          detailImages: res.data.detailPictusres || [],
          goods: res.data.goods
        })
      }
      wx.hideLoading()
    }).catch(e => {
      wx.hideLoading()
    })
  },

  // 加入购物车
  addShoppingCart: function(){
    this.setData({ visible: true, btnType: '1'})
  },

  addCart: function(e){
    const { goods } = this.data
    util.request(api.wx_cart_add, {
      goodsId: goods.Id,
      goodsNumber: e.detail,
    }, 'POST').then(res => {
      if (res.code === 200) {
        wx.showToast({
          title: '添加成功！',
          icon: 'none'
        })
        // 刷新购物车数量
        cart.getCartList().then(res => {
          if(res.code === 200 && res.data.lists){
            this.setData({cartNum: res.data.lists.length})
          }
        })
        cart.setCartCheckbox(goods)
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

  // 立即购买
  buynow: function(){
    this.setData({ visible: true, btnType: '2' }) 
  },
  
  // 通告
  onNoticebar: function(){
    this.setData({show: true})
  },
  
  // 取消通告
  onCancelMask: function(){
    this.setData({ show: false })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
    wx.setNavigationBarTitle({
      title: "详情",
    })
    const cart = wx.getStorageSync("cart") || [];
    if(cart.length > 0){
      this.setData({cartNum: cart.length})
    }
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