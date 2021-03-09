// pages/schedule/index.js
let utils=require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeLine:[],
    today:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app=getApp();
    let that=this;
    app.$request.get('/meetings/getMeetingList',{},{
      success:function(res){
        if(res.data.code==200){
          let temp=[];
          for(let item of res.data.data){
            temp.push({
              time:utils.formatTime('YYYY年mm月dd日 HH:MM',new Date(item.time_begin))+' - '+utils.formatTime('HH:MM',new Date(item.time_end)),
              desc:['主题:'+item.theme,'地点:'+item.mname+'('+item.mpos+')','发起人:'+item.sponsor,'备注:'+(item.remark==''?'无':item.remark)]
            });
          }
          that.setData({
            timeLine:temp,
            today:res.data.today
          });
        }
      },loadText:'加载中'
    });
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
    app.$track.trackPage('pages/schedule/index');
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