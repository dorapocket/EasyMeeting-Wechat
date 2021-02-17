// app.js
App({
  onLaunch() {
    // 下载字体
    wx.loadFontFace({
      global:true,
      family:"HanYiQiHei-55S",
      source:"https://easymeeting-statics.oss-cn-hangzhou.aliyuncs.com/fonts/hy-55s.ttf",
    });
    wx.loadFontFace({
      global:true,
      family:"HanYiQiHei-40S",
      source:"https://easymeeting-statics.oss-cn-hangzhou.aliyuncs.com/fonts/hy-40s.ttf",
    });
    wx.loadFontFace({
      global:true,
      family:"Myriadpro Light",
      source:"https://easymeeting-statics.oss-cn-hangzhou.aliyuncs.com/fonts/myriadpro-light.ttf",
    });
    wx.loadFontFace({
      global:true,
      family:"Myriadpro Regular",
      source:"https://easymeeting-statics.oss-cn-hangzhou.aliyuncs.com/fonts/myriadpro-regular.ttf",
    });
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})