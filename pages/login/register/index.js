// pages/login/register/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    realname:'',
    email:'',
    tel:'',
    pass:'',
    pass2:'',
  },

  onUsernameChange(e){
    this.setData({
      username:e.detail.value
    });
  },
  onRealnameChange(e){
    this.setData({
      realname:e.detail.value
    });
  },
  onEmailChange(e){
    this.setData({
      email:e.detail.value
    });
  },
  onTelephoneChange(e){
    this.setData({
      tel:e.detail.value
    });
  },
  onPasswordChange(e){
    this.setData({
      pass:e.detail.value
    });
  },
  onPasswordReChange(e){
    this.setData({
      pass2:e.detail.value
    });
  },
  submit(){
    const REGS = {
      username: /^[a-zA-z]\w{3,15}$/,
      telephone: /^1\d{10}$/,
      email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    };
    if (!REGS.username.test(this.data.username)||this.data.username=='') {
      wx.showToast({
        title: '用户名不合法，请重新输入',
        icon:'none'
      });
      return;
    }
    if (!REGS.telephone.test(this.data.tel)||this.data.tel=='') {
      wx.showToast({
        title: '电话号码不合法，请重新输入',
        icon:'none'
      });
      return;
    }
    if (!REGS.email.test(this.data.email)||this.data.email=='') {
      wx.showToast({
        title: '邮箱不合法，请重新输入',
        icon:'none'
      });
      return;
    }
    if(this.data.pass!=this.data.pass2){
      wx.showToast({
        title: '两次密码不一致，请重试',
        icon:'none'
      })
      return;
    }
    let that=this;
    let app=getApp();
    app.$request.post('/user/register',{
      username:this.data.username,
      realname:this.data.realname,
      telephone:this.data.tel,
      email:this.data.email,
      certificate:this.data.pass
    },{
      success:function(){
        wx.showToast({
          title: '注册成功',
          icon:'success',
          duration:2000
        });
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/login/wxLogin/bindUser',
          });
        },2000);
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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