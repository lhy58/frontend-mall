var WxApiURL = 'http://49.234.105.64:8000'

// 装载请求服务器的地址
module.exports = {
  wx_home: WxApiURL + '/api/goods/wechat/home', // 首页
  wx_category_type: WxApiURL + '/api/border/list', // 分类
  wx_category_list: WxApiURL + '/api/goods/wechat/classify?', // 分类列表
  wx_hot_sell: WxApiURL + '/api/goods/wechat/hot/sell', // 推荐
  wx_commodity_detail: WxApiURL + '/api/goods/wechat/detail?', // 商品详情
  wx_auth_login: WxApiURL + '/wx/auth?', // 获取token
  wx_token: WxApiURL + '/auth', // 调式token
  wx_address_list: WxApiURL + '/api/address/list?', //地址列表
  wx_address_add: WxApiURL + '/api/address/add', // 新增地址
  wx_address_edit: WxApiURL + '/api/address/add', // 修改地址
  wx_address_delete: WxApiURL + '/api/address/delete?', // 删除地址
  wx_address_default: WxApiURL + '/api/address/default?', // 设置默认
  wx_address: WxApiURL + '/api/address?', // 查询收货地址
  wx_search: WxApiURL + '/api/goods/wechat/search?', // 搜索列表
  wx_cart_list: WxApiURL + '/api/shopping/cart/list', // 购物车列表
  wx_cart_add: WxApiURL + '/api/shopping/cart/add', // 添加购物车
  wx_cart_edit: WxApiURL + '/api/shopping/cart/edit', // 编辑物车
  wx_cart_delete: WxApiURL + '/api/shopping/cart/delete?', // 编辑物车
}

// 小程序前端存有以下内容键值
/*
* wx.setStorageSync('cart') // 购物车
* wx.setStorageSync('token')
* wx.setStorageSync('cart_checkbox') // 购物车选中状态
*/ 