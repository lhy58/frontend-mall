Component({
  /**
 * 组件的属性列表
 */
  properties: {
    width: {
      type: Number,
      value: 375, // 手机屏宽
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick () {
      wx.navigateTo({
        url: `/pages/commodityDetail/commodityDetail?id=` + this.data.item.Id,
      })
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