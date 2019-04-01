// pages/book-alive/book-alive.js
var base_sreach=require('../../utils/base_sreach.js')
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
        }
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
        this.getBookInfoforPage();
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
    getBookInfoforPage(bookName={bookName:'哲学的感悟'}){
       /* if(!bookName){
            bookName="哲学的感悟"
        }*/
        let promise = base_sreach.getBookInfoByBookName(bookName);
        let _this=this;
        promise.then(res=>{
            console.log(res)
            _this.setData({
                book:res.data
            })
        }).catch(err=>{
            console.log(err)
        })

    }
})