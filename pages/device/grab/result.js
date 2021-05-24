let utils = require("../../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mid:'',
    done:true,
    msg:'请稍后',
    extraMsg:'无',
    time:'-'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    const app=getApp();
    let that=this;
    this.setData({
      mid:query.mid||''
    });
    app.$request.get('/wechat/grabRoom', {
      mid: this.data.mid
    }, {
      success:function(res){
        if(res.data.code==200){
          that.setData({
            done:true,
            msg:'抢占成功',
            extraMsg:res.data.data.msg,
            time:utils.formatTime('YYYY年mm月dd日 HH:MM-', new Date(res.data.data.time_begin))+utils.formatTime('HH:MM', new Date(res.data.data.time_end))
          })
        }else{
          that.setData({
            done:false,
            msg:'抢占失败',
            extraMsg:res.data.data.msg,
            time:'-'
          });
        }
      },
      loadText:'拼命操作中'
    });
  },
  nvback:function(){
    wx.navigateBack();
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
    app.$track.trackPage('pages/login/scanLogin/success');
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