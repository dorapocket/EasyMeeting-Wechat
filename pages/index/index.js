Page({
  data: {
      list: [
          {
              id: 'createMeeting',
              name: '新建会议',
              open: false,
              badge:0,
              pages: ['createMeeting', 'scanLogin']
          },
          {
            id: 'notice',
            name: '通知',
            open: false,
            badge:2,
            pages: []
        },
          {
              id: 'schedule',
              name: '日程',
              open: false,
              badge:0,
              pages: []
          },
          {
              id: 'manage',
              name: '管理',
              open: false,
              badge:0,
              pages: []
          },
          {
              id: 'my',
              name: '我的',
              open: false,
              badge:0,
              pages: []
          }
      ]
  },
  kindToggle: function (e) {
      var id = e.currentTarget.id, list = this.data.list;
      for (var i = 0, len = list.length; i < len; ++i) {
          if (list[i].id == id) {
              list[i].open = !list[i].open
          } else {
              list[i].open = false
          }
      }
      this.setData({
          list: list
      });
  },
  changeTheme: function() {
      console.log(this.data);
      getApp().themeChanged(this.data.theme === 'light' ? 'dark' : 'light');
  }
});
