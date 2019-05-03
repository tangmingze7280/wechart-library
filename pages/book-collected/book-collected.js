// pages/book-collected/book-collected.js
const conllections = require('../../utils/collection_books')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collections: [],
        wxId:'oR5YB5SwlSZS0m-RqCXFMhkxAVr0',
        pageSize:5,
        pageNum:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadCollectionList();
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
    /*取消收藏*/
    delCollection: function (totol) {
        var bookCode=totol.target.dataset.hi;
        var userId=wx.getStorageSync('third_Session')||this.data.wxId;
        console.log(userId,bookCode);
        conllections.deleteCollection(userId,bookCode)
            .then((res)=>{
                console.log(res);
                wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000
                })
                totol.display=false;
                this.loadCollectionList();
            }).catch((e)=>{

        })

    },
    /*加载收藏列表*/
    loadCollectionList:function(){
        console.log('加载收藏列表——————————————')
        console.log('——————————————')
        var _this=this;
        var aimdarr=[];
        var promias= conllections.getConllections(this.data.wxId,this.data.pageSize,this.data.pageNum);
        promias.then((res)=>{
            console.log(res);
            aimdarr=res.data.data.resultList;
            var conarr=this.data.collections;
            conarr=conarr.concat(conarr,aimdarr)
            console.log(conarr);
            console.log(res.data.data.resultList);
            this.setData({
                collections:conarr,
                pageNum:_this.data.pageNum+1
            })
            console.log(_this.data.collections[1]);
        }).catch((e)=>{

        })
    }
})