var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
    data: {
        tabs: ["选项一", "选项二", "选项三"],
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0,
        inputShowed: false,
        inputVal: "",
        selectLimit: ["霍乱时期的爱情", "百年孤独", "小王子", "解忧杂货铺"], //这个是搜索框推荐搜索,
        bookRunking: [{
            img:"/static/imgs/icon_add_to_booklist.png",
            bookName:"霍乱时期的爱情",
            introduce:"这是一本不错的书"
        }, {
                img:"/static/imgs/icon_bell.png",
                bookName:"百年孤独",
                introduce:"这也是一本不错的书"
            }]
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    classify: function () {
        /*页面跳转待定*/
        /*wx.navigateTo({
          url: '/pages/first-btn/first-btn',

        })*/
        /*下拉选项*/
        wx.showActionSheet({
            itemList: ['文学', '小说', '科普'],
            success: function (res) {
                console.log(res)
                /*判断是否点击取消按钮如果点击取消按钮怎不做处理*/
                if (!res.cancel) {
                    console.log(res.tapIndex)
                }
            }
        });
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        console.log(e)
        this.setData({
            inputVal: e.detail.value
        });
        wx.post
    }
});