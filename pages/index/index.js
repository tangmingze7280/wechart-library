var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var BASE_SREACH = require('../../utils/base_sreach.js');
Page({
    data: {
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0,
        inputShowed: false,
        inputVal: "",
        selectLimit: ["霍乱时期的爱情", "百年孤独", "小王子"], //这个是搜索框推荐搜索,
        bookRunking: [{
            img: "/static/imgs/icon_add_to_booklist.png",
            bookName: "霍乱时期的爱情",
            introduce: "这是一本不错的书"
        }, {
            img: "/static/imgs/icon_bell.png",
            bookName: "百年孤独",
            introduce: "这也是一本不错的书"
        }],
        sreachOrClassif: true,
        imgUrls: [
            BASE_SREACH.URL + "/imgs/timg.jpg",
            BASE_SREACH.URL + "/imgs/timg2.jpg",
            BASE_SREACH.URL + "/imgs/timg3.jpg"
        ],
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        indicatorColor: "#eee",
        bookCount:0
    },
    onLoad: function () {
        var that = this;
        /*wx.getSystemInfo({
            success: function (res) {

                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });*/
        this.getBorrowCount()

    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    classify: function () {
        var _this = this;
        /*下拉选项*/
        var itemList = []
        var result = BASE_SREACH.getClassifList();
        result.then(res => {
            console.log(res)
            itemList = res.data.data
            wx.showActionSheet({
                itemList: itemList.map((e) => {
                    return e.name;
                }),
                success: function (res) {
                    console.log(itemList, res)
                    console.log(itemList[res.tapIndex])
                    /*判断是否点击取消按钮如果点击取消按钮不做处理*/
                    if (res.cancel) {
                        console.log(res.tapIndex)
                        return
                    }
                    wx.navigateTo({
                        url: "/pages/book-list/book-list?tabs=" + itemList[res.tapIndex].number
                    })


                }
            });
        }).catch(err => {
            console.log(err)
            wx.showToast({
                title: err.msg,
                icon: '/static/imgs/icon_nav_special.png'
            })
        })

    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: "",
            sreachOrClassif: true
        });
    },
    inputTyping: function (e) {
        let _this = this;
        if (e.detail.value && e.detail.value.length != 0) {
            _this.setData({
                sreachOrClassif: false
            })
        } else {
            _this.setData({
                sreachOrClassif: true
            })
        }
        this.setData({
            inputVal: e.detail.value
        });
        let promise = BASE_SREACH.getBookNameForSreach({simpleTitle: e.detail.value});
        promise.then((res) => {
            _this.setData({
                selectLimit: res.data.data
            })
        }).catch((err) => {
            console.log(err)
        })
    },
    sreachBookList: function (value) {
        let _this = this
        wx.navigateTo({
            url: '/pages/book-alive/book-alive?nextBookName=' + _this.data.inputVal
        })
    },
    getBorrowCount() {
        var wxId = wx.getStorageSync('third_Session') || 'oR5YB5SwlSZS0m-RqCXFMhkxAVr0';
        let param = {wxId}
        console.log(param)
        let promise = BASE_SREACH.getCountNumBookRead(param);
        let _this=this
        promise.then(function(data){
            console.log(data.data);
            _this.setData({
                bookCount:data.data.data
            })
        },function(err){

        })
    }
});