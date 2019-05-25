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
        bookImg: BASE_SREACH.URL + "/imgs/book-pic/png1.jpg",
        author: [],
        showModel:true,
        input:'',
        cvalue:'',
        bookSum:100
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
    landBook: function () {
        var bookId = this.data.book;
        var wxId = wx.getStorageSync('third_Session');
        var params = {
            bookId: bookId.isbn,
            wxId: wxId
        };
        var bookSum=this.data.bookSum-1;
        var _this=this;
        wx.showModal({
            title: '确认借书',
            content: '借书还书期限为13天',
            confirmText: "借书",
            cancelText: "取消",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    borrowed_porduct.addOrderByParams(params)
                        .then((res) => {
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'success',
                                duration: 2000
                            });
                            if(res.data.state==500){
                                _this.setData({
                                    bookSum:bookSum
                                })
                            }
                        }).catch((e) => {
                        wx.showToast({
                            title: '服务器异常',
                            icon: 'warning',
                            duration: 2000
                        });
                    })
                }else{
                    console.log('用户点击辅助操作')
                }
            }
        });

    },
    showReiviewDialog(){
        this.setData({
            showModel:false,
            input:''
        })
    },
    model2cancel: function () {
        // console.log('取消');
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
    },
    onPreview:function(){
        wx.previewImage({
            current: this.data.bookImg,
            urls: [this.data.bookImg]
        })
    }
})