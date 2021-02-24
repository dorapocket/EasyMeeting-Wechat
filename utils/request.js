function Request(baseUrl,token){
  this.url=baseUrl;
  this.token=token;
  this.noAuth=['/','/user/login','/wechat/mplogin'];
  this.setToken=function(token){
    this.token=token;
    return;
  }
  this.get=function(api,data,cb={}){
    if(cb.loadText){
      wx.showLoading({
        title: cb.loadText,
      })
    }
    let header={};
    if(this.noAuth.indexOf(api)==-1){
      header={
        'Authorization':this.token,
      };
    };
    wx.request({
      url: this.url+api,
      data:data,
      header:header,
      timeout:5000,
      method:'GET',
      success:function(...args){
        wx.hideLoading();
        if(cb.success&&typeof cb.success=='function'){
          let cbs=cb.success;
          cbs(...args);
        }
        if(args[0]&&args[0].data&&args[0].data.msg&&args[0].data.code!=200){
          if(args[0].data.code==401){
            //未登录
            wx.redirectTo({
              url: '/pages/login/wxLogin/wxLogin',
            })
          }
          wx.showToast({
            title: args[0].data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail:function(...args){
        wx.hideLoading();
        if(cb.fail&&typeof cb.fail=='function'){
          let cbf=cb.fail;
          cbf(...args);
        }
          wx.showToast({
            title: '网络错误',
            icon: 'error',
            duration: 2000
          })
      },
      complete:function(...args){
        if(cb.complete&&typeof cb.complete=='function'){
          let cbc=cb.complete;
          cbc(...args);
        }
      }
    });
  }


  this.post=function(api,data,cb={}){
    if(cb.loadText){
      wx.showLoading({
        title: cb.loadText,
      })
    }
    let header={};
    if(this.noAuth.indexOf(api)==-1){
      header={
        'Authorization':this.token,
      };
    };
    wx.request({
      url: this.url+api,
      data:data,
      header:header,
      timeout:5000,
      method:'POST',
      success:function(...args){
        wx.hideLoading();
        if(cb.success&&typeof cb.success=='function'){
          let cbs=cb.success;
          cbs(...args);
        }
        if(args[0]&&args[0].data&&args[0].data.msg&&args[0].data.code!=200){
          wx.showToast({
            title: args[0].data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail:function(...args){
        wx.hideLoading();
        if(cb.fail&&typeof cb.fail=='function'){
          let cbf=cb.fail;
          cbf(...args);
        }
          wx.showToast({
            title: '网络错误',
            icon: 'error',
            duration: 2000
          })
      },
      complete:function(...args){
        if(cb.complete&&typeof cb.complete=='function'){
          let cbc=cb.complete;
          cbc(...args);
        }
      }
    });
  }
}

module.exports=Request;