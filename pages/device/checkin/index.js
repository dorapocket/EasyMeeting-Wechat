// pages/device/checkin/index.js
let utils=require("../../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnLoading:false,
    sponsor:'',
    theme:'',
    time:'',
    did:'',
    msg:'',
    mid:'',
    aid:'',
    needCheckin:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    let that=this
    const app=getApp();
    const mid = decodeURIComponent(query.mid);
    console.log(mid);
    this.setData({
      mid
    });
    app.$request.get('/wechat/getCouldCheckinList',{
      mid:this.data.mid
    },{
      success:function(res){
        console.log(res);
        if(res.data.data){
          // 有data 要签到
          that.setData({
            sponsor:res.data.data.sponsor,
            theme:res.data.data.mname,
            time:utils.formatTime('YYYY年mm月dd日 HH:MM-', new Date(res.data.data.time_begin))+utils.formatTime('HH:MM', new Date(res.data.data.time_end)),
            needCheckin:true,
            msg:res.data.msg,
            aid:res.data.data.aid
          });
        }else{
          that.setData({
            sponsor:'',
            theme:'会议签到',
            time:'',
            needCheckin:false,
            msg:res.data.msg
          });
        }
      },
      loadText:'正在查询会议'
    });
  },

  doCheckin:function(){
    let that=this;
    console.log('tap checkin :',this.data.aid);
    this.setData({
      btnLoading:true
    });
    const app=getApp();
    if(this.data.aid!=''){
        app.$request.get('/wechat/checkIn',{
      aid:this.data.aid
    },{
      success:function(res){
        that.setData({
          btnLoading:false
        });
        if(res.data.code==200){
          wx.showToast({
            icon:'success',
            title: '签到成功',
          });
          setTimeout(()=>{wx.navigateBack();},1500);
          
        }else{
          wx.showToast({
            icon:'error',
            title: '签到时间未到',
          })
        }
      },
      loadText:'签到中'
    });  
    }else{
      wx.showToast({
        icon:'error',
        title: '会议不存在',
      })
    }

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