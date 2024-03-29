<div align= "center">
<img align="center" src="screenshots/meetingroom.png" />
<h2 align="center" style="">EasyMeeting</h2>
<h3 align="center" style="">Wechat Miniprogram</h3>
<br/><br/>
</div>

## About Easymeeting

“会易”是一款专为会议室打造的智能会议解决方案。
“会易”支持会议室创建与管理、会议室预约、会议预约、签到、迟到抢占、无线投屏等多种功能。有自己的用户体系，并支持微信小程序绑定和扫码登陆。

Easymeeting is an meeting solution specially built for conference rooms.
Easymeeting supports various functions such as conference room creation and management, conference room reservation, meeting reservation, check-in, room preemption, wireless screen casting, etc. Has its own user system, and support wechat miniprogram binding and wechat scan login.

## About This Project
本工程是微信小程序部分代码。
This project is part of the Wechat Miniprogram code.

若要使用，请：
- 重命名project.config.sample.json为project.config.json
- 在project.config.json内写入appid（在微信开放平台获取）
- 修改config.js为你的服务器地址

To use, please:
- Rename project.config.sample.json to project.config.json
- Write appID in project.config.json (obtained from wechat Open platform)
- Modify config.js to your server address

![wxacode](screenshots/wxacode.jpg)

支持功能 Support functions: 
- [x]  用户登录和注册 User login and registration
- [x]  小程序扫码登陆 Miniprogram scan code login
- [x]  会议预约  Meeting appointment
- [x]  个人任务查看 Personal Task
- [x]  WebRTC无线投屏 Wireless screen casting
- [x]  会议室管理 Conference room management
- [x]  设备管理 Device management
- [x]  设备绑定（小程序实现）Device binding (miniprogram implementation)
- [x]  会议签到（小程序实现）Meeting check-in (miniprogram implementation)
- [x]  会议室抢占（小程序实现）Meeting room preemption (miniprogram implementation)
- [x]  会议邀请处理 Meeting invitation processing
- [x]  签到状态查询 Check-in status query
- [ ]  设置 Settings

## ScreenShots
主页 Index

![index](screenshots/index.jpg)

新建会议 Meeting appointment

![create](screenshots/create.jpg)

会议邀请处理 Meeting invitation processing

![notice](screenshots/notice.jpg)

邮件提醒 Mail Notice

![mail](screenshots/mail.jpg)

## Develop



欢迎提pr或更好的idea！

Welcome to submit PR or better idea!

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

#build windows exe
yarn run build:win
```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
