var WxApiURL = 'http://49.234.105.64:8000'

// 装载请求服务器的地址
module.exports = {
  wx_home: WxApiURL + '/api/goods/wechat/home', // 首页
  wx_category_type: WxApiURL + '/api/border/list', // 分类
  wx_category_list: WxApiURL + '/api/goods/wechat/classify?', // 分类列表
  wx_hot_sell: WxApiURL + '/api/goods/wechat/hot/sell', // 推荐
  wx_commodity_detail: WxApiURL + '/api/goods/wechat/detail?' // 商品详情
}