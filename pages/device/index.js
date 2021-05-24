// pages/device/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomName:'',
    roomPos:'',
    admin_uid:'',
    did:'',
    mid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    let that=this
    const app=getApp();
    const scene = decodeURIComponent(query.scene);
    this.setData({
      did:scene
    });
    app.$request.get('/wechat/getDeviceInfo',{
      did:scene
    },{
      success:function(res){
        console.log(res);
        that.setData({
          roomName:res.data.data.mname,
          roomPos:res.data.data.pos,
          admin_uid:res.data.data.admin_uid,
          mid:res.data.data.mid
        })
      },
      loadText:'获取信息中'
    });
  },
  openCheckin:function(){
    console.log('openCheckin',this.data.mid);
    wx.navigateTo({
      url: '/pages/device/checkin/index?mid='+this.data.mid,
    })
  },
  openGrab:function(){
    console.log('openGrab');
    wx.navigateTo({
      url: '/pages/device/grab/index?mid='+this.data.mid,
    })
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