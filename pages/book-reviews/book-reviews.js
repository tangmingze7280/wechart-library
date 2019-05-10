const reviews = require('../../utils/reviews')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reviews: [],
        type: '',
        loadMoreStatus: 'hidding',
        wxId: '',
        bookCode: '',
        bookName:'',
        userName:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var type = options.type;
        console.log(options, type);
        var wxId = wx.getStorageSync('third_Session')||'oR5YB5SwlSZS0m-RqCXFMhkxAVr0';
        var bookCode = options.bookCode||'';
        this.setData({
            type: type,
            wxId: wxId,
            bookCode: bookCode
        })
        this.loadReviews();
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
    /**
     * 加载评论
     */
    loadReviews: function () {
        var type = this.data.type;
        var param = {
            wxId: this.data.wxId,
            bookCode: this.data.bookCode
        };
        console.log(param,type);
        if (type && type == 'usereview') {
            this.loadusereview(param);
        } else if (type && type == 'bookreview') {
            this.loadbookreview(param);
        }
    },
    loadusereview: function (param) {
        reviews.getListByUserId(param).then((res) => {
            console.log(res);
            var result = res.data.data;
            this.setData({
                reviews: result,
                userName:result[0].userName||''
            })
        }).catch((e) => {
            console.log(e)
        })
    },
    loadbookreview: function (param) {
        reviews.getListByBookCode(param).then((res) => {
            console.log(res);
            var result = res.data.data;
            this.setData({
                reviews: result,
                bookName:result[0].bookName||''
            });
        }).catch((e) => {
            console.log(e)
        })
    },
    delReviews:function (e) {
        var id= parseInt(e.target.dataset.hi);
        var reviews=this.data.reviews;
        console.log(id)
        var param={
            id:id
        }
        reviews.delOne(param).then((res)=>{
            console.log(res);
        }).catch((e) => {
            console.log(e)
        })
    }
})