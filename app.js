//app.js

App({
    onLaunch: function () {
        wx.checkSession({
            success: function (data) {
                console.log(data)
            /*    wx.navigateTo({
                  url: '/pages/index/index'
                })*/
            },
            fail: function (e) {
               /* //不存在登陆态
                wx.login({
                    success(data){
                        console.log(data,data.code)
                        var url="https://api.weixin.qq.com/sns/jscode2session?appid=wx2fa6a201795b152e&secret=81df253f70c995803ba26ee21be6bc8b&grant_type=authorization_code&js_code="+data.code
                        wx.request({
                            url:url,
                            success:res=>{
                                console.log(res)
                            }
                        })
                    }
                })
                console.log(e)*/
            }
        })
    }
})

/*secret_id=81df253f70c995803ba26ee21be6bc8b*/
/*
*
* wx.login({
                    success: res => {
                        wx.setStorageSync('code', res.code);
                        console.log(wx.getStorageSync('code'))

                        // 获取用户信息
                        wx.getSetting({
                            success: res => {
                                console.log(res)
                                //引导用户授权
                                wx.openSetting({
                                    success(res) {
                                        console.log(res.authSetting)
                                        // res.authSetting = {
                                        //   "scope.userInfo": true,
                                        //   "scope.userLocation": true
                                        // }
                                    }
                                })
                                if (res.authSetting['scope.userInfo']) {
                                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                                    wx.getUserInfo({
                                        success: res => {
                                            // 可以将 res 发送给后台解码出 unionId
                                            console.log(res.userInfo,res)
                                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                            // 所以此处加入 callback 以防止这种情况
                                            if (this.userInfoReadyCallback) {
                                                this.userInfoReadyCallback(res)
                                            }
                                        }
                                    })
                                }
                            }
                        })
                        /*if (res.code) {
                          console.log(res)
                          // 发起网络请求
                          wx.request({
                            url: 'http://localhost:8999/synchInfo',
                            data: {
                              code: res.code
                            }
                          })
                        } else {
                          console.log('登录失败！' + res.errMsg)
                        }
}
})
*
* */