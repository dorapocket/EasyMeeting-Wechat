// pages/notice/index.js
let utils=require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: [
    ],
    processDialog: false,
    processDialogData: {
      title: '',
      subTitle: '',
    },
    processDialogMovements: [{
        name: '1',
        value: '接受'
      },
      {
        name: '2',
        value: '请假'
      },
      {
        name: '3',
        value: '其它原因'
      },
    ],
    processDialogExt: false,
    processDialogReason: "",
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

  refreshData:function(){
    let app = getApp();
    let that = this;
    app.$request.get('/message/historyMessage', {}, {
      success: function (res) {
        /*
                {
                  msgId: 1001,
                  theme: '股东大会',
                  desc: ['地点：大会议室（6教北101)', '时间：2020年2月19日 13：00-14：00'],
                  from: 'xxx',
                  msgTime: '2020年2月4日 10:22',
                  msgType
                  extra: '',
                },*/
        let temp = [];
        for (let data of res.data.data) {
          temp.push({
            msgId: data.msgId,
            theme: data.theme,
            desc: ['地点:' + data.mname + '(' + data.mpos + ')', '时间:' + utils.formatTime('YYYY年mm月dd日 HH:MM-', new Date(data.time_begin)) + utils.formatTime('HH:MM', new Date(data.time_end))],
            from: data.sponsor,
            msgTime: utils.formatTime('YYYY年mm月dd日 HH:MM', new Date(data.msgTime)),
            msgType: data.msgType,
            extra: ''
          });
        }
        that.setData({
          notice: temp
        });
      },
      loadText: '加载中'
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let app=getApp();
    app.$track.trackPage('pages/notice/all');
    this.refreshData();
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