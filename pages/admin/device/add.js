// pages/admin/meetingRoom/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetingRooms: [],
    meetingRoomsData:[],
    meetingRoomIndex: 0,
    extra:'',
    cfgCode:'',
  },
  roomChange(e){
    this.setData({
      meetingRoomIndex:e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    const scene = decodeURIComponent(query.scene);
    this.setData({
      cfgCode:scene,
    });
    let app=getApp();
    let that=this;
    app.$request.get('/meetings/getMeetingRoomList',{},{
      success:function(res){
        let rooms=[];
        for(let room of res.data.data){
          rooms.push(room.name);
        }
        that.setData({
          meetingRooms:rooms,
          meetingRoomsData:res.data.data
        });
      },loadText:'加载中'
    });
  },
  extraInput(e){
    this.setData({
      extra:e.detail.value
    });
  },
  submit:function(){
    let mid=this.data.meetingRoomsData[this.data.meetingRoomIndex].mid;
    let extra=this.data.extra;
    let configCode=this.data.cfgCode;
    let app=getApp();
    let that=this;
    app.$request.post('/device/regist',{
      mid,extra,configCode
    },{
      success:function(res){
        if(res.data.code==200){
          wx.showToast({
            title: '绑定成功',
            icon:'success',
            duration:2000
          });
          setTimeout(function(){
            wx.reLaunch({
              url: '/pages/index/index',
            })
          },2000);
        }
      },loadText:'正在绑定'
    });
app.$track.trackAction('Button','Click','BindDevice');
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
app.$track.trackPage('pages/admin/device/add');
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