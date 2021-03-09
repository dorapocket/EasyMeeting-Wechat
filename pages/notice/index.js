// pages/notice/index.js
let utils = require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: [],
    processDialog: false,
    processDialogData: {
      title: '',
      subTitle: '',
    },
    processDialogMovements: [{
        name: 'CONFIRM',
        value: '接受'
      },
      {
        name: 'REJECT',
        value: '请假'
      },
    ],
    processDialogExt: false,
    processDialogReason: "",
    processDialogChoice: "CONFIRM",
    processDialogIndex: 0
  },
  radioChange: function (e) {
    this.setData({
      processDialogChoice: e.detail.value
    });
    if (e.detail.value == 'REJECT') {
      this.setData({
        processDialogExt: true,
        processDialogReason: "",
      });
    } else {
      this.setData({
        processDialogExt: false,
        processDialogReason: "",
      });
    }
  },
  onReasonChange: function (e) {
    this.setData({
      processDialogReason: e.detail.value
    });
  },
  sendReply: function () {
    if (this.data.processDialogChoice=='REJECT'&&this.data.processDialogReason == '') {
      wx.showToast({
        title: '请填写理由',
        icon:'none'
      })
      return;
    }
    let that=this;
    let app = getApp();
    app.$request.post('/message/messageFeedback', {
      msgId: this.data.notice[this.data.processDialogIndex].msgId,
      type: this.data.notice[this.data.processDialogIndex].msgType,
      fb: this.data.processDialogChoice,
      reply: this.data.processDialogReason||'',
    }, {
      success: function (res) {
        if (res.data.code == 200){
          wx.showToast({
            title: '回复成功',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            processDialog: false,
            processDialogData: {
              title: '',
              subTitle: '',
            },
            processDialogChoice: 'CONFIRM',
            processDialogExt: false,
            processDialogReason: "",
          });
          that.refreshData();
        }
      },
      loadText:'提交中'
    });
  },
  closeProcessDialog: function () {
    this.setData({
      processDialog: false,
      processDialogData: {
        title: '',
        subTitle: '',
      },
      processDialogExt: false,
      processDialogReason: "",
    });
  },
  openProcessDialog: function (e) {
    let app = getApp();
    app.$track.trackAction('Button', 'Click', 'dealNotice');
    let index = e.currentTarget.dataset.idx;
    this.setData({
      processDialogIndex: index,
      processDialogData: {
        title: '回复:' + this.data.notice[index].theme,
        subTitle: "",
      },
      processDialog: true,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  refreshData:function(){
    let app = getApp();
    let that = this;
    app.$request.get('/message/unreadMessage', {}, {
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
  onLoad: function (options) {
    this.refreshData();
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
    let app = getApp();
    app.$track.trackPage('pages/notice/index');
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