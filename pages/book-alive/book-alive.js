// pages/book-alive/book-alive.js
const base_sreach = require('../../utils/base_sreach.js')
const util = require('../../utils/util.js')
const collection = require('../../utils/collection_books')
var BASE_SREACH = require('../../utils/base_sreach.js');
const borrowed_porduct = require('../../utils/borrowed_porduct.js')
const reviews=require('../../utils/reviews')
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
        bookImg: BASE_SREACH.URL + "/imgs/timg.jpg",
        author: [],
        showModel:true,
        input:'',
        cvalue:''
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
                        wx.showToast({
                            title: '该书不存在',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            }
            ;
            console.log(res);
            _this.setData({
                book: res.data
            })
            var amd = res.data;
            /* var x="[\"马克思\",\"恩格斯\",\"韦建桦\"] "
             console.log(x);
             console.log(x.substring(2,x.length-3).split('\",\"'));
             console.log(amd.author)
             console.log((amd.author).substr(2,amd.length-2))*/
            console.log(amd.author);
            var amdarr = (amd.author).substring(2, amd.author.length - 2).split('\",\"');
            console.log(amdarr);
            _this.setData({
                author: amdarr
            })
        }).catch(err => {
            console.log(err)
            util.wxalert(err.message)
        })
    },
    updataCollection: function () {
        var _this = this
        try {
            const value = wx.getStorageSync('third_Session')
            if (value) {
                collection.updataCollection(value, _this.data.book.isbn).then((res) => {
                    console.log(res);
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'success',
                        duration: 2000
                    })
                }).catch((err) => {
                    console.log(err)
                })

            } else {
                throw new Error("用户未登录");
            }
        } catch (e) {
            console.log(e.message)
            wx.navigateTo({
                url: '/pages/getUserInfo/getUserInfo'
            })
        }
    },
    onShowPopup: function () {
        var bookId = this.data.book;
        var wxId = wx.getStorageSync('third_Session');
        var params = {
            bookId: bookId.isbn,
            wxId: wxId
        };
        borrowed_porduct.addOrderByParams(params)
            .then((res) => {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000
                });
            }).catch((e) => {
            wx.showToast({
                title: '服务器异常',
                icon: 'warning',
                duration: 2000
            });
        })
    },
    showReiviewDialog(){
        this.setData({
            showModel:false,
            input:''
        })
    },
    model2cancel: function () {
        console.log('取消');
        this.setData({
            showModel: true,
            input: ''
        })
    },
    model2confirm: function () {
        var bookId = this.data.book;
        var wxId = wx.getStorageSync('third_Session');
        var params = {
            bookId: bookId.isbn,
            wxId: wxId,
        };
        var input= this.data.input;
        console.log(input);
        var cvalue= this.data.cvalue;
        params.content=input;
        params.score=parseInt(cvalue)
        console.log(params);
        reviews.addReview(params).then((res)=>{
            console.log(res)
        }).catch((e)=>{
            console.log(e)
        });
        this.setData({
            showModel: true,
            input: ''
        })
    },
    input:function (e) {
        console.log(e.detail.value)
        this.setData({
            input:e.detail.value
        })
    },
    valueChange:function (e) {
        console.log(e.detail.value);
        this.setData({
            cvalue:e.detail.value
        })
    },
    onNavigate:function () {
        var bookCode=this.data.book.isbn
        console.log(bookCode)
        var url=`/pages/book-reviews/book-reviews?type=bookreview&bookCode=${bookCode}`
        wx.navigateTo({
            url:url,

        })
    }
})