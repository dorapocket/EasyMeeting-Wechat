// app.js
App({
  onLaunch() {
    let cfg=require("./config");
    let Request=require("./utils/request");
    const Track = require("./utils/track");
    this.$track=new Track(cfg.track_ip,3,-1);
    this.$request=new Request(cfg.server_ip,'');
    // 下载字体
    wx.loadFontFace({
      global:true,
      family:"HanYiQiHei-55S",
      source:"https://static.cdn.easymeeting.lgyserver.top/static/fonts/hy-55s.ttf",
    });
    wx.loadFontFace({
      global:true,
      family:"HanYiQiHei-40S",
      source:"https://static.cdn.easymeeting.lgyserver.top/static/fonts/hy-40s.ttf",
    });
    wx.loadFontFace({
      global:true,
      family:"Myriadpro Light",
      source:"https://static.cdn.easymeeting.lgyserver.top/static/fonts/myriadpro-light.ttf",
    });
    wx.loadFontFace({
      global:true,
      family:"Myriadpro Regular",
      source:"https://static.cdn.easymeeting.lgyserver.top/static/fonts/myriadpro-regular.ttf",
    });
    // 展示本地存储能力
    // 登录
    try{
      var value = wx.getStorageSync('token') || '';
    }catch(e){
      console.log(e);
    }
      let that=this;
      if (value&&value!='') {
        this.$request.setToken(value);
        this.$request.get('/user/validToken',{},{
          success:function(res){
            if(res.data.code==200){
              that.$request.setToken(res.data.data.token);
              wx.setStorageSync('token', res.data.data.token);
              that.globalData.token=res.data.data.token;
              that.getUserInfo();
            }else{
              wx.redirectTo({
                url: '/pages/login/wxLogin/wxLogin',
              })
            }
          }
        });
        this.globalData.token=value;
      }else{
        wx.redirectTo({
          url: '/pages/login/wxLogin/wxLogin',
        })
      }
  },
  getUserInfo:function(){
    let app=getApp();
    app.$request.get('/user/userInfo',{},{
      success:function(res){
        if(res.data.code==200){
          wx.setStorageSync('userInfo', res.data.data);
          app.$track.setUid(res.data.data.uid);
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    token:''
  },
})
