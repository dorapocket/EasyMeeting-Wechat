// pages/creatMeeting/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        meetingRooms: ['大会议室', '小会议室'],
        meetingRoomIndex: 0,
        date: '2021-02-17',
        timeBegin:"12:00",
        timeEnd:"15:00",
        selectPeopleDialog:false,
        pageTop:0,
        members: [
          { index: '1', name: '李国宇', checked: false },
          { index: '2', name: '章天杰', checked: false },
          { index: '1', name: '李国宇', checked: false },
          { index: '2', name: '章天杰', checked: false },
          { index: '1', name: '李国宇', checked: false },
          { index: '2', name: '章天杰', checked: false },
          { index: '1', name: '李国宇', checked: false },
          { index: '2', name: '章天杰', checked: false },
      ]
  },
  openSelectPeopleDialog(){
    let that=this;
    const query = wx.createSelectorQuery()
    query.select('#page').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      that.setData({
        pageTop:res[0].top,
        selectPeopleDialog:true,
    });
    })
    
},
  close(){
    let that=this;
    const query = wx.createSelectorQuery()
    query.select('#page').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      console.log(res);
      that.setData({
        pageTop:0,
        selectPeopleDialog:false,
    });
    wx.pageScrollTo({
      scrollTop: -res[0].top,
      duration: 0
    });
    })
},
return(){

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