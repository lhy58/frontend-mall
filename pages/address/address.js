const util = require('../../utils/util.js')
const api = require('../../utils/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '1', // 新增
    checkbox: true,
    username: '',
    phone: '',
    region: '',
    address: '',
    phoneErr: '', // 手机格式错误提示信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const params = options.params ? JSON.parse(options.params) : null
    if(params){
      // 修改title
      wx.setNavigationBarTitle({
        title: '编辑地址' 
      })
      this.setData({
        type: '2', // 编辑
        id: params.Id, // 修改Id
        checkbox: params.Status===1? true : false,
        username: params.UserName,
        phone: params.ReceiverTelephone,
        region: params.ReceiverArea,
        address: params.ReceiverAddrDetail,
      })
    }
  },
  
  // 微信授权获取电话
  getPhoneNumber: function(e){
    console.log('e', e)
  },

  onChangeName: function(e){
    this.setData({username: e.detail})
  },

  onChangePhone: function(e){
    this.setData({phone: e.detail})
    if(!e.detail){
      this.setData({phoneErr: ''})  
    }
  },

  onBlur: function(e){
    if(!(/^1[3456789]\d{9}$/.test(e.detail.value))){ 
      this.setData({phoneErr: '手机号格式错误，请重填'})  
    }else {
      this.setData({phoneErr: ''})  
    }
  },

  onChangeRegion: function(e){
    this.setData({region: e.detail})
  },

  onChangeAddress: function(e){
    this.setData({address: e.detail})
  },

  onCheckbox: function(e){
    this.setData({checkbox: !this.data.checkbox})
  },

  onBtn: function(){
    const {username, phone, address, region, checkbox, type, Id} = this.data
    if(!username){
      return wx.showToast({
        title: '请输入收货人',
        icon: 'none',
      })
    }
    if(!phone || !(/^1[3456789]\d{9}$/.test(phone))){
      return wx.showToast({
        title: '请输入联系电话',
        icon: 'none',
      })
    }
    if(!region){
      return wx.showToast({
        title: '请输入省，市，区',
        icon: 'none',
      })
    }
    if(!address){
      return wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
      })
    }

    wx.showLoading({
      title: '加载中...',
    })
    const data = {
      userId: 0,
      userName: username,
      receiverTelephone: phone,
      receiverArea: region,
      receiverAddrDetail: address,
      status: checkbox ? "1" : '0'
    }
    let url = api.wx_address_add
    if(type === '2'){ // 编辑
      data.id = Id,
      url = api.wx_address_edit
    }
    util.request(url, data, 'POST').then(res => {
      if (res.code === 200){
        wx.showToast({
          title: '操作成功',
          duration: 2000,
          complete: function(){
            wx.navigateBack({
              delta: 1,
            })
          }
        })
      }else {
        wx.showToast({
          title: '操作失败',
        })
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})