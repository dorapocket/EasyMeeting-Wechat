// pages/device/checkin/index.js
let utils = require("../../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnLoading: false,
    msg:'',
    checkinBtn:false,
    grabBtn:false,
    currentMeeting:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    let that = this
    const app = getApp();
    const mid = decodeURIComponent(query.mid);
    this.setData({
      mid
    });
    app.$request.get('/wechat/grabRoomInfo', {
      mid: this.data.mid
    }, {
      success: function (res) {
        console.log(res);
        switch (res.data.data.type) {
          case 'GO_CHECKIN':
            that.setData({
              msg: res.data.data.msg,
              checkinBtn: true,
              grabBtn: false,
              currentMeeting: {}
            });
            break;
          case 'COULD_GRAB':
            that.setData({
              msg: res.data.data.msg,
              checkinBtn: false,
              grabBtn: true,
              currentMeeting: {
                aid: res.data.data.currentMeeting.aid,
                theme: res.data.data.currentMeeting.theme,
                sponsor: res.data.data.currentMeeting.sponsor,
                time: utils.formatTime('YYYY年mm月dd日 HH:MM-', new Date(res.data.data.currentMeeting.time_begin))+utils.formatTime('HH:MM', new Date(res.data.data.currentMeeting.time_end)),
              }
            });
            break;
          case 'NO_MEETING':
            that.setData({
              msg: res.data.data.msg,
              checkinBtn: false,
              grabBtn: false,
              currentMeeting: {}
            });
            break;
        }
      },
      loadText: '正在查询'
    });
  },

  gotoCheckin: function () {
    const app=getApp();
    app.$track.trackAction('Button','Click','CantGrabGoCheckin');
    wx.navigateTo({
      url: '/pages/device/checkin/index?mid=' + this.data.mid,
    })
  },
  doGrab:function(){
    const app=getApp();
    app.$track.trackAction('Button','Click','GrabRoom');
    wx.navigateTo({
      url: '/pages/device/grab/result?mid='+this.data.mid,
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
    let app=getApp();
    app.$track.trackPage('pages/admin/device/grab/index');
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