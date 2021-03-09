// pages/admin/meetingAdmin.js
let utils=require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetings: [],
  },
openActionSheet:function(e){
  let that=this;
  let app=getApp();
  
  wx.showActionSheet({
    itemList: ['删除'],
    success (res) {
      let aid = e.currentTarget.dataset.idx;
      let index =  e.currentTarget.dataset.index
      if(res.tapIndex==0){
        app.$track.trackAction('ActionSheet','Click','deleteMeeting');
        app.$request.get('/meetings/deleteMeeting',{
          aid
        },{
          success:function(res){
            if(res.data.code==200){
            wx.showToast({
              title: '删除成功',
              icon:'success',
              duration:2000
            });
            let t=that.data.meetings;
            t.splice(index,1); 
            that.setData({
              meetings:t
            });
          }
          },
          loadText:'操作中'
        });
      }
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
    this.getMeetingData();
    let app=getApp();
    app.$track.trackPage('pages/meeting/meetingAdmin');
  },
  getMeetingData(){
    let that=this;
    let app=getApp();
    app.$request.get(
      '/meetings/getMyMeetingList',{},
      {
        success:function(res){
          let temp=[];
          for(let data of res.data.data){
            temp.push({
              aid: data.aid,
              theme: data.theme,
              desc: ['地点：'+data.mname+'（'+data.mpos+')', '时间：'+utils.formatTime("YYYY年mm月dd日 HH:MM",new Date(data.time_begin))+'-'+utils.formatTime("HH:MM",new Date(data.time_end))],
              from: '我自己',
              msgTime: utils.formatTime("YYYY年mm月dd日 HH:MM",new Date(data.create_time)),
              extra: '',
            });
          }
          that.setData({
            meetings:temp
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