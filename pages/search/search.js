const util = require('../../utils/util.js')
const api = require('../../utils/api.js')
const cart = require('../../utils/cart')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['综合推荐', '销量', '价格'],
    value: '',
    list: [],
    page: 1,
    sort: '0',
    isPage: true, // 是否可分页
    noMore: false,
    visible: false,
    infos: {},
  },

  onSearch: function(e) {
    this.setData({value: e.detail, page: 1, list: [], noMore: false}, function(){
      this.getSearch()
    })
  },
  onChange: function(e) {
   
  },

  onChangeTabs: function(e){
    this.setData({sort: e.detail.name, list:[], page: 1, noMore: false}, function(){
      this.getSearch()
    })
  },

  // 加入购物车
  addCartShow: function(e){
    this.setData({ visible: true, infos: e.detail })
  },

  addCart: function(e){
    const { infos } = this.data
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
    console.log('options', options)
    this.setData({ value: options.value }, function(){
      this.getSearch()
    })
  },

  getSearch: function(){
    const { page, value, list, sort,} = this.data
    wx.showLoading({
      title: '正在加载...',
    })
    util.request(api.wx_search, {
      goodsName: value,
      page: page,
      pageSize: 10,
      sort: sort,
    }, 'GET').then(res => {
      if (res.code === 200 && res.data.lists && res.data.lists.length > 0 ){
        console.log('datas')
        this.setData({list: [].concat(list, res.data.lists), isPage: true})
      }else {
        this.setData({noMore: true})
      }
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
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
    const { isPage, page } = this.data
    if(isPage){
      this.setData({page: page + 1, isPage: false}, function(){
        this.getSearch()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})