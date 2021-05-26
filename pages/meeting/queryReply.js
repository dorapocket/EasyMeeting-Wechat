// pages/admin/meetingAdmin.js
let utils=require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    replyStat: [],
    aid:''
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