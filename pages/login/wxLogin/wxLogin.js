// pages/login/wxLogin/wxLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnLoading:false,
  },
  login:function(){
    this.loginMethod();
  },
  getUserInfo:function(){
    let app=getApp();
    app.$request.get('/user/userInfo',{},{
      success:function(res){
        if(res.data.code==200){
          wx.setStorageSync('userInfo', res.data.data);
          app.$track.setUid(res.data.data.uid);
        }
      }
    });
  },
  loginMethod:function(){
    let app=getApp();
    let that=this;
    app.$track.trackAction('Button','Click','loginWithWechat');
    this.setData({
      btnLoading:true,
    })
    wx.login({
      success (res) {
        if (res.code) {
          app.$request.post('/wechat/mplogin',{
            token:res.code,
          },{
            success:function(res){
              if(res.data.code==200){
                try {
                  wx.setStorageSync('token', res.data.token);
                  app.$request.setToken(res.data.token);
                  that.getUserInfo();
                } catch (e) { 
                  console.log(e);
                }

                wx.redirectTo({
                  url: '/pages/index/index',
                });
                wx.showToast({
                  title: '登录成功',
                  icon:"success"
                });
              }else if(res.data.code==202){
                wx.redirectTo({
                  url: '/pages/login/wxLogin/bindUser',
                });
              }
            }
          });
        } else {

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loginMethod();
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
    app.$track.tarckPage('pages/login/wxLogin/wxLogin');
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