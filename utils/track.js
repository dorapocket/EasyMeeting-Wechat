function Track(url,siteid,userid=-1){
  this.TRACK_URL=url+'/matomo.php';
  this.SITE_ID=siteid;
  this.USER_ID=userid;
  this.setUid=function(uid){
    this.USER_ID=uid;
  }
  this.basicConfig=function(){
    return {
      idsite:this.SITE_ID,
      rec:1,
      apiv:1,
      rand:new Date().valueOf(),
      uid:this.USER_ID
    };
  }
  this.sendTrack=function(obj){
    Object.assign(obj,this.basicConfig());
    wx.request({
      url: this.TRACK_URL,
      method:'GET',
      data:obj
    });
  }
  this.tarckPage=function(pageUrl){
    this.sendTrack({
      action_name:pageUrl,
      url:pageUrl,
    });
  }

  this.trackAction=function(ec,ea,en){
    this.sendTrack({
      e_c:ec,
      e_:ea,
      e_n:en
    });
  }
}
module.exports=Track;