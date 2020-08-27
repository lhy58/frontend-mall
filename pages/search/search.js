const util = require('../../utils/util.js')
const api = require('../../utils/api.js')

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
  },

  onSearch: function(e) {
    this.setData({value: e.detail}, function(){
      this.getSearch()
    })
  },
  onChange: function(e) {
   
  },

  onChangeTabs: function(e){
    this.setData({sort: e.detail.name})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    this.setData({ value: options.value || '1' }, function(){
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
        this.setData({list: [].concat(list, res.data.lists)})
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
    console.log('list', this.data.list)
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