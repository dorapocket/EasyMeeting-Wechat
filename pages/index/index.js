let cfg=require("../../config");
Page({
    data: {
        list: [{
                id: 'createMeeting',
                name: '会议',
                open: false,
                sub: true,
                badge: 0,
                pages: [{
                    route: 'meeting/add',
                    name: '新建会议'
                },{
                    route: 'meeting/meetingAdmin',
                    name: '我发出的会议'
                }],
            },
            {
                id: 'notice',
                name: '通知',
                open: false,
                sub: true,
                badge: 0,
                pages: [{
                    route: 'notice/index',
                    name: '未处理的通知'
                }, {
                    route: 'notice/all',
                    name: '所有通知'
                }],
            },
            {
                id: 'schedule',
                name: '日程',
                sub: false,
                open: false,
                badge: 0,
                pages: [{
                    route: 'schedule/index',
                    name: '日程'
                }]
            },
            {
                id: 'manage',
                name: '管理',
                sub: true,
                open: false,
                badge: 0,
                pages: [{
                    route: 'admin/meetingRoom/admin',
                    name: '会议室管理'
                }]
            },
            {
                id: 'my',
                name: '我的',
                sub: false,
                open: false,
                badge: 0,
                pages: []
            }
        ]
    },
    kindToggle: function (e) {
        var id = e.currentTarget.id,
            list = this.data.list;
        let redirect = '';
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open;
                if (!list[i].sub) {
                    redirect = '/pages/' + list[i].pages[0].route;
                }
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        });
        if (redirect != '') {
            wx.navigateTo({
                url: redirect,
            })
        }
    },
    changeTheme: function () {
        console.log(this.data);
        getApp().themeChanged(this.data.theme === 'light' ? 'dark' : 'light');
    },
    onShow:function(){
        console.log(cfg.server_ip);
    },
    onLoad (query) {
        // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
        const scene = decodeURIComponent(query.scene);
    }
});