// pages/admin/meetingRoom/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    pos:'',
    maxpeople:0,
    desc:'',
  },
  onNameChange:function(e){
    this.setData({
      name:e.detail.value
    });
  },
  onPosChange:function(e){
    this.setData({
      pos:e.detail.value
    });
  },
  onMaxpeopleChange:function(e){
    this.setData({
      maxpeople:e.detail.value
    });
  },
  onDescChange:function(e){
    this.setData({
      desc:e.detail.value
    });
  },
  createMeetingRoom:function(){
    let app=getApp();
    app.$track.trackAction('Button','Click','createMeetingRoom');
    let that=this;
    app.$request.post('/meetings/createMeetingRoom',{
      name:that.data.name,
      maxpeople:that.data.maxpeople,
      position:that.data.pos,
      description:that.data.desc,
    },{
      success:function(res){
        if(res.data.code==200){
        wx.navigateBack({
          delta: 1
        });
        wx.showToast({
          title: '创建成功',
          icon: 'success', // error
          duration: 2000
        });
      }
    },
      loadText:'正在创建'
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
let app=getApp();
app.$track.tarckPage('pages/admin/meetingRoom/add');
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