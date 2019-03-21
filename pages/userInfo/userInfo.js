// pages/userInfo/userInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        headerImg:'',
        userName:'',
        isLogin:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let _this=this
       /* wx.checkSession({
            success: function (data) {
                console.log(data)
            },
            fail: function (e) {
                //不存在登陆态
                wx.login({
                    success(res) {
                        if (res.code) {
                            // 发起网络请求
                            wx.request({
                                url: 'https://test.com/onLogin',
                                data: {
                                    code: res.code
                                }
                            })
                        } else {
                            console.log('登录失败！' + res.errMsg)
                        }
                    }
                })
                console.log(e)
            }
        })*/

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})