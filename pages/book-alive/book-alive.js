// pages/book-alive/book-alive.js
const base_sreach = require('../../utils/base_sreach.js')
const util = require('../../utils/util.js')
const collection=require('../../utils/collection_books')
var BASE_SREACH = require('../../utils/base_sreach.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookName: "",
        pageStatus: 'loading',
        // 图书信息
        book: {},
        // 图书馆列表
        libraryList: {
            show: false,
            status: 'loading', // loading, nodata, done
            data: []
        },
        bookImg: BASE_SREACH.URL+"/imgs/timg.jpg"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this
        /*console.log(options)
        this.setData({
            bookName: options.nextBookName
        })*/
        // console.log(_this.bookName)
        console.log("-------------")
        this.getBookInfoforPage(options.nextBookName);
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

    },
    getBookInfoforPage(bookName = '哲学的感悟') {
        let promise = base_sreach.getBookInfoByBookName({bookName: bookName});
        let _this = this;
        promise.then(res => {
            if (!res.data.title || res.data.title == null) {
                console.log(1)
                wx.navigateBack({
                    delta: 1,
                    success: (res) => {
                        wx.showToast({
                            title: '该书不存在',
                            icon: 'none',
                            duration: 2000
                        })
                    },
                    fail: () => {

                    }
                })
            };
            console.log(res);
            _this.setData({
                book: res.data
            })
        }).catch(err => {
            console.log(err)
            util.wxalert(err.message)
        })
    },
    updataCollection:function(){
        var _this=this
        try {
            const value = wx.getStorageSync('third_Session')
            if (value) {
                collection.updataCollection(value,_this.data.book.isbn).then((res)=>{
                    console.log(res)
                    wx.showToast({
                        title: '收藏成功',
                        icon: 'success',
                        duration: 2000
                    })
                }).catch((err)=>{
                    console.log(err)
                })

            }else{
                throw new Error("用户未登录");
            }
        } catch (e) {
            console.log(e.message)
            wx.navigateTo({
                url: '/pages/getUserInfo/getUserInfo'
            })
        }
    }
})