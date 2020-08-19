Component({
  /**
 * 组件的属性列表
 */
  properties: {
    show: {// 弹框
      type: Boolean,
      value: false,
    },
    type: {// 按钮类型
      type: String,
      value: '1'
    },
    infos: {
      type: Object,
      value: {},
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true,
    count: 1, // 数量
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick() {
      console.log('123123')
      wx.navigateTo({
        url: `/pages/commodityDetail/commodityDetail`,
      })
    },
    onCancel: function(){
      this.setData({show: false})
    },
    onChange: function(e){
      console.log('value1', e)
      this.setData({count: e.detail})
    },
    addCart: function(value) {
      this.triggerEvent("addCart", this.data.count)
      this.onCancel()
    },
    _error() {
      //触发取消回调 triggerEvent 触发回调事件 bingd:error 触发error,我们在这边可以打印this中可以找到属性triggerEvent 在属性里面可以找到回调的方法
      this.triggerEvent("error")
    },
    _success() {
      //触发成功回调
      this.triggerEvent("success");
    }
  }
})