// pages/admin/meetingAdmin.js
let utils=require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    replyStat: [],
    aid:'',
    theme:'反馈',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    const scene = decodeURIComponent(query.aid);
    this.setData({
      aid:scene
    })
    this.getMeetingData(scene);
    let app=getApp();
    app.$track.trackPage('pages/meeting/queryReply');
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
  getMeetingData(aid){
    let that=this;
    let app=getApp();
    app.$request.get(
      '/meetings/queryUserReply',{
        aid
      },
      {
        success:function(res){
          let temp=[];
          for(let data of res.data.data){
            temp.push({
              uid: data.uid,
              checked: data.checked,
              reply:data.reply,
              checkin:data.checkin==1?true:false,
              name:data.name
            });
          }
          that.setData({
            theme:res.data.theme,
            replyStat:temp
          })
        },
        loadText:'加载中'
      }
    );
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
    this.getMeetingData();
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