const DEV_URL="http://localhost:8999/library";
const PROP_URL=""
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

function onLogin() {
    wx.login({
        success: function (res) {
            if (res.code) {
                //发起网络请求
                wx.request({
                    url: DEV_URL+'/login',
                    data: {
                        code: res.code
                    },
                    success: function (res) {
                        const self = this
                        if (true) {
                            //获取到用户凭证 存儲 3rd_session
                            console.log(res)
                            var json = JSON.parse(res.data.Data)
                            wx.setStorage({
                                key: "third_Session",
                                data: json.third_Session
                            })
                            getUserInfo()
                        }
                        else {

                        }
                    },
                    fail: function (res) {
                        console.log(res,'失败')
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
                url: DEV_URL+'',
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
                    if (逻辑成功) {
                        //SQL更新用户数据成功
                    }
                    else {
                        //SQL更新用户数据失败
                    }
                }
            })
        }
    })
}
module.exports={
    userLogin:userLogin,
    onLogin:onLogin,
    getUserInfo:getUserInfo,
    userInfoSetInSQL:userInfoSetInSQL
}