// pages/admin/meetingRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetingRoomList:[{
      name:'大会议室',
      desc:['地点：六教北110','设备：黑板、投影'],
      maxpeople:50
    },{
      name:'小会议室',
      desc:['地点：六教北111','设备：投影'],
      maxpeople:5
    },],
  },
  openActionSheet:function(){
    wx.showActionSheet({
      itemList: ['删除'],
      success (res) {
        console.log(res.tapIndex)
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
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