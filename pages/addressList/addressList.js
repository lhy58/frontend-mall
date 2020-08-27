const util = require('../../utils/util.js')
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressList()
  },

  getAddressList: function(){
    wx.showLoading({
      title: '正在加载...',
    })
    util.request(api.wx_address_list).then(res => {
      if (res.data && res.data.lists){
        this.setData({
          list: res.data.lists,
        })
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

  deleteAddress: function(item){
    wx.showLoading({
      title: '正在加载...',
    })
    util.request(api.wx_address_delete, {
      id: item.Id
    }, 'GET').then(res => {
      if (res.code === 200){
        this.getAddressList()
        wx.showToast({
          title: '删除成功！',
          icon: 'none'
        })
      }else {
        wx.showToast({
          title: '删除失败！',
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.hideLoading()
    })
  },

  onDelete: function (e) {
    const _that = this
    const { item } = e.target.dataset
    if(item.Status === 1){
      return wx.showToast({
        title: '当前默认地址，不可删除',
        icon: 'none'
      })
    }
    wx.showModal({
      title: '提示',
      content: '您确定要删除该地址？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          _that.deleteAddress(item)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 设置默认
  onCheckAll: function(e){
    const { item } = e.target.dataset
    const { list } = this.data
    wx.showLoading({
      title: '加载中...',
    })
    util.request(api.wx_address_default, {
      id: item.Id,
      status: e.detail?'1':'0'
    }, 'GET').then(res => {
      if (res.code === 200){
        wx.showToast({
          title: '设置成功！',
          icon: 'none'
        })
        list.map(obj => {
          if(obj.Id === item.Id){
            obj.Status = 1
          }else {
            obj.Status = 0
          }
        })
        this.setData({ list })
      }else {
        wx.showToast({
          title: '设置失败！',
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.hideLoading()
    })
  },

  // 编辑
  onEdit: function(e){
    wx.navigateTo({url: '/pages/address/address?params=' + JSON.stringify(e.target.dataset.item)})
  },

  onBtn: function () {
    wx.navigateTo({url: '/pages/address/address'})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('1111')
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