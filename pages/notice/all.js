// pages/notice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: [{
        msgId: 1001,
        theme: '股东大会',
        desc: ['地点：大会议室（6教北101)', '时间：2020年2月19日 13：00-14：00'],
        from: '李国宇',
        msgTime: '2020年2月4日 10:22',
        extra: '已接受',
      },
      {
        msgId: 2001,
        theme: '股东小会',
        desc: ['地点：大会议室（6教北101)', '时间：2020年2月19日 13：00-14：00'],
        from: '李国宇',
        msgTime: '2020年2月4日 10:22',
        extra: '已拒绝',
      }
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