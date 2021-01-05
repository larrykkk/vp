# vp 
某次面試之作業
- [vp](#vp)
  - [測驗內容](#測驗內容)
  - [請實作出 首頁、收藏頁、播放頁](#請實作出-首頁收藏頁播放頁)
    - [切版](#切版)
    - [首頁功能要求：](#首頁功能要求)
    - [收藏頁功能要求：](#收藏頁功能要求)
    - [播放頁功能要求](#播放頁功能要求)
    - [加分題 (均未實作)](#加分題-均未實作)
  - [Project setup](#project-setup)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Lints and fixes files](#lints-and-fixes-files)
    - [Customize configuration](#customize-configuration)

## 測驗內容

    不限定框架 (Angular、React、Vue ...other)，建立影音網站。
    其餘功能可視為加分題請自由發揮


請到 google apis console 申請一個api金鑰
https://console.developers.google.com/apis/dashboard

串接youtube videos api 
https://developers.google.com/youtube/v3/docs/videos/list


## 請實作出 首頁、收藏頁、播放頁
    
### 切版
    1. 請手刻撰寫 css (scss、sass)，不使用其他第三方框架如：bootstrap
    1. 需有RWD(電腦版、平板、手機)
    1. 可自行設計 UI 樣式或參考 youtube 網站

### 首頁功能要求：
    1. 每頁顯示12部影片 ![](https://i.imgur.com/iQBuRdO.jpg)
    2. 收藏功能
    3. 影片資訊需有包含：
        1. 圖片
        1. 影片長度
        1. 影片標題
        1. 影片描述
    4. 點選影片進入播放頁
    5. 頁籤：
        1. 總計列出100部影片，用頁籤切換顯示項目
        ![](https://i.imgur.com/pjHWTp1.png)
        
### 收藏頁功能要求：
    1. 列出已收藏影片列表
    2. 收藏功能
    3. 影片資訊同首頁
    4. 點選影片進入播放頁
    5. 重整頁面或重新進入列表不會消失 

### 播放頁功能要求
    1. 標題、影片描述使用點選的影片資訊
    1. 請實作播放器，播放下方影片（可使用任意播放器的lib）
    https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8
    1. 播放暫停時顯示廣告,廣告樣式自行發揮

### 加分題 (均未實作)
    1. 搜尋欄
    2. 播放器快進/倒進15秒
    3. 其他(請自行發揮)
    
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
