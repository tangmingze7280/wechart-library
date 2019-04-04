// pages/userInfo/userInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        headerImg:'',
        userName:'',
        isLogin:false,
        userCode:'xxx'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this=this
        var unic=''
        try {
            const value = wx.getStorageSync('third_Session')
            if (value) {
                unic=value
            }else{
                throw new Error("用户未登录");
            }
        } catch (e) {
            console.log(e.message)
            wx.navigateTo({
              url: '/pages/getUserInfo/getUserInfo'
            })
        }
        console.log(unic)
        _this.setData({
            userCode:unic
        })
        console.log(_this.data.userCode)
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