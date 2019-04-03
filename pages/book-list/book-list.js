import {getBookInfoBySomeOne} from '../../utils/base_sreach'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: {},
        books: [],
        comments: [], // 推荐图书的描述
        loadMoreStatus: 'hidding', // loading, nomore
        isNoData: false, // 是否没有数据
        pageSize: 7,
        pageNum:0,
        param:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this=this;
        console.log(options.tabs)
        var param={classif:'',runking:'',history:'',collection:'',pageNum:1,pageSize:7}
        if(options.tabs)
            param.classif=options.tabs
        wx.showLoading({title: '加载中', mask: true})

        console.log(options)
        this.setData({
            type: options.type || "",
            param:param
        })
        this.selectBookList(param)


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

        var _this=this;
        _this.setData({
            loadMoreStatus:"loading"
        })
        this.setData({
            pageNum:_this.data.pageNum+7
        })
        getBookInfoBySomeOne(_this.data.param).then((res) => {
            console.log(res)
            let b=res.data.data
            if(!b){
                console.log("1------------------------")
                _this.setData({
                    loadMoreStatus:"nomore"
                })
                return ;
            }
            let bookList=_this.data.books
            bookList.push(...b)
            _this.setData({
                books:bookList,
                loadMoreStatus:"hidding"
            })
            console.log(_this.data.books)
        }).catch((err) => {
            console.log(err)
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(){

    },

    selectBookList:function(param){
        let _this=this;
        getBookInfoBySomeOne(param).then((res) => {
            console.log(res)
            _this.setData({
                books:res.data.data
            })
            wx.hideLoading()
        }).catch((err) => {
            console.log(err)
        })
    }

})