// pages/creatMeeting/index.js
let utils=require("../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
        meetingRooms: [],
        meetingRoomsData:[],
        meetingRoomIndex: 0,
        date: utils.formatTime('YYYY-mm-dd',new Date()),
        timeBegin:utils.formatTime('HH:MM',new Date()),
        timeEnd:utils.formatTime('HH:MM',new Date()),
        selectPeopleDialog:false,
        pageTop:0,
        members: [],
        membersSelected:[],
        membersSelectedText:"请选择",
        commitNum:0,
        theme:"",
        commit:""
  },
  setTheme(e){
    this.setData({
      theme:e.detail.value,
    });
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
roomChange(e){
  this.setData({
    meetingRoomIndex:e.detail.value
  });
},
checkboxChange(e){
  let value=e.detail.value;
  let formMember=[];
  let text="";
  for(let i of value){
    formMember.push(JSON.stringify({
      uid:this.data.members[Number(i)].uid,
      realname:this.data.members[Number(i)].name,
    }));
  }
  if(formMember.length>2){
    text=JSON.parse(formMember[0]).realname+','+JSON.parse(formMember[1]).realname+'等'+formMember.length+'人';
  }else{
    for(let k of formMember){
      text+=JSON.parse(k).realname+',';
    }
    text=text.substr(0,text.length-1);
  }
  this.setData({
    membersSelected:formMember,
    membersSelectedText:text
  });
},
commitInput(e){
  this.setData({
    commitNum:e.detail.value.length,
    commit:e.detail.value
  });
},
clearChoice(){
  let temp=[];
  for(let item of this.data.members){
    temp.push({
      name:item.name,
      uid:item.uid,
      checked:false
    });
  }
  this.setData({
    members:temp,
    membersSelected:[],
    membersSelectedText:"请选择",
  });
},
confirmChoice(){
  this.close();
},
  close(){
    let that=this;
    const query = wx.createSelectorQuery()
    query.select('#page').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
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
bindDateChange(e){
  this.setData({
    date:e.detail.value
  });
},
bindBeginTimeChange(e){
  this.setData({
    timeBegin:e.detail.value
  });
},
bindEndTimeChange(e){
  this.setData({
    timeEnd:e.detail.value
  });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app=getApp();
    let that=this;
    app.$request.get('/meetings/getMeetingRoomList',{},{
      success:function(res){
        let rooms=[];
        for(let room of res.data.data){
          rooms.push(room.name+'('+room.position+','+room.max_people+'人)');
        }
        that.setData({
          meetingRooms:rooms,
          meetingRoomsData:res.data.data
        });
      },loadText:'加载中'
    });
    app.$request.get('/meetings/getAllUsers',{},{
      success:function(res){
        let users=[];
        for(let user of res.data.data){
          users.push({
            name:user.realname,
            uid:user.uid,
            checked:false
          });
        }
        that.setData({
          members:users
        });
      },
    });
  },
  submit(){
    let app=getApp();
    app.$track.trackAction('Button','Click','submitMeetingCreate');
    wx.showLoading({
      title: '创建中',
    });
    let theme=this.data.theme;
    let mid=this.data.meetingRoomsData[this.data.meetingRoomIndex].mid;
    let date=this.data.date;
    let time_begin=new Date(this.data.date.replace(/-/g,'/')+' '+this.data.timeBegin).valueOf(); // 模拟器测不出来，ios必须要/分割 否则会null
    let time_end=new Date(this.data.date.replace(/-/g,'/')+' '+this.data.timeEnd).valueOf();
    let member=JSON.stringify(this.data.membersSelected);
    let remark=this.data.commit;
    app.$request.post('/meetings/createMeeting',{
      theme,mid,date,time_begin,time_end,member,remark
    },{
      success:function(res){
        if(res.data.code==200){
          wx.navigateBack({
            delta: 1,
          });
          wx.showToast({
            title: '创建成功',
            icon: 'success',
            duration: 2000
          })
        }else if(res.data.msg=='会议冲突'){
          wx.showModal({
            title: '会议冲突',
            content: '相关时段（'+utils.formatTime("YYYY-mm-dd HH:MM",new Date(res.data.data.time_begin))+' - '+utils.formatTime("HH:MM",new Date(res.data.data.time_end))+'）已被 '+res.data.data.sponsor+' 预订用于 '+res.data.data.theme+' ,请重新选择！',
          })
        }
      }
    }
    );
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
    app.$track.tarckPage('pages/meeting/add');
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