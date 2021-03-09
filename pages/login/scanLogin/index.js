Page({

  /**
   * 页面的初始数据
   */
  data: {
    from: '',
    ip: '',
    scene: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    const scene = decodeURIComponent(query.scene);
    console.log(scene);
    this.setData({
      scene: scene
    });
    this.getInfo(scene);
  },
  getInfo: function (scene) {
    if(scene=='undefined') scene='';
    let app = getApp();
    let that = this;
    app.$request.get('/wechat/getPCLoginInfo', {
      code: scene
    }, {
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            ip: res.data.data.ip,
            from: res.data.data.from
          });
        }else{
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      },
      loadText: '请稍后'
    });
  },
  cancel:function(){
    wx.redirectTo({
      url: '/pages/index/index',
    });
    let app=getApp();
    app.$track.trackAction('Button','Click','cancelScanLogin');
  },
  loginConfirm: function () {
    let that=this;
    let app=getApp();
    app.$track.trackAction('Button','Click','loginConfirm');
    wx.login({
      success(res) {
        if (res.code) {
          app.$request.get('/wechat/confirmPCLogin', {
            code: that.data.scene,
          }, {
            success: function (res) {
              if(res.data.code==200){
                wx.redirectTo({
                  url: '/pages/login/scanLogin/success?username='+res.data.data.username,
                })
              }
            },
            loadText: '请稍后'
          });
        }
      }
    });
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
    let app=getApp();
    app.$track.trackPage('pages/login/scanLogin/index');
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