// pages/admin/meetingRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetingRoomList:[],
  },
  openActionSheet:function(event){
    let that=this;
    let app=getApp();
    wx.showActionSheet({
      itemList: ['删除'],
      success (res) {
        app.$track.trackAction('ActionSheet','Click','deleteMeetingRoom');
        if(res.tapIndex==0&&event.currentTarget.dataset.mid){
          app.$request.get('/meetings/deleteMeetingRoom',{
            mid:event.currentTarget.dataset.mid
          },{
            success:function(res){
              if(res.data.code==200){
                let idx=event.currentTarget.dataset.index;
                let temp=that.data.meetingRoomList;
                temp.splice(idx,1);
                that.setData({
                  meetingRoomList:temp
                });
                wx.showToast({
                  title: '删除成功',
                  icon:'success',
                  duration:2000
                })
              }
            },loadText:'删除中'
          });
          
        }
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
    let app=getApp();
app.$track.trackPage('pages/admin/meetingRoom/admin');
    let that=this;
    app.$request.get('/meetings/getMeetingRoomList',{},{
      success:function(res){
        if(res.data.code==200){
          let temp=[];
          for(let room of res.data.data){
            temp.push({
              mid:room.mid,
              name:room.name,
              maxpeople:room.max_people,
              desc:['地点:'+room.position,'设备:'+room.description]
            });
          }
          that.setData({
            meetingRoomList:temp
          });
        }
      },
      loadText:'加载中'
    });
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