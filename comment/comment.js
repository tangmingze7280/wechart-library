const DEV_URL = "https://127.0.0.1:80/library";
// const DEV_URL = "https://www.gttview.club/library";
const PROP_URL = ""

function userLogin() {
    wx.checkSession({
        success: function () {
            console.log('已经登陆！')
            //存在登陆态
            wx.navigateBack('/pages/index/index')
        },
        fail: function () {
            //不存在登陆态
            console.log('尚未登陆')
            onLogin()
        }
    })
}

function onLogin(userInfo) {
    wx.login({
        success: function (res) {
            if (res.code) {
                //发起网络请求
                wx.request({
                    url: DEV_URL + '/login',
                    data: {
                        code: res.code,
                        wxUser: userInfo
                    },
                    success: function (res) {
                        const self = this
                       // console.log(res.data.data.city)
                        console.log(res)
                        if (res.data.state && res.data.state==200) {
                            //获取到用户凭证 存儲 3rd_session
                            console.log(res)
                            var json = res.data.data
                             wx.setStorage({
                                 key: "third_Session",
                                 data: json.wxCode
                             })
                            wx.setStorage({
                                key:"userInfo",
                                data:JSON.stringify(json)
                            })
                            wx.switchTab({ //跳转到tarbar页并关闭其他页面
                                url: '/pages/index/index'
                            })
                        } else {
                            wx.showModal({
                                content: '用户权限获取失败',
                                showCancel: false,
                                success: function (res) {
                                    if (res.confirm) {
                                        console.log('请检查appid和secretId')
                                    }
                                }
                            });
                        }
                    },
                    fail: function (res) {
                        console.log(res, '失败')
                        wx.showModal({
                            content: '授权失败，请重新授权',
                            showCancel: false,
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                }
                            }
                        });
                    }
                })
            }
        },
        fail: function (res) {

        }
    })

}

function getUserInfo() {
    wx.getUserInfo({
        success: function (res) {
            var userInfo = res.userInfo
            userInfoSetInSQL(userInfo)
        },
        fail: function () {
            userAccess()
        }
    })
}

function userInfoSetInSQL(userInfo) {
    wx.getStorage({
        key: 'third_Session',
        success: function (res) {
            wx.request({
                url: DEV_URL + '',
                data: {
                    third_Session: res.data,
                    nickName: userInfo.nickName,
                    avatarUrl: userInfo.avatarUrl,
                    gender: userInfo.gender,
                    province: userInfo.province,
                    city: userInfo.city,
                    country: userInfo.country
                },
                success: function (res) {
                    if (true) {
                        //SQL更新用户数据成功
                    } else {
                        //SQL更新用户数据失败
                    }
                }
            })
        }
    })
}

module.exports = {
    userLogin: userLogin,
    onLogin: onLogin,
    getUserInfo: getUserInfo,
    userInfoSetInSQL: userInfoSetInSQL
}