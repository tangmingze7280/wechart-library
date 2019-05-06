var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
import {getBorrowListById,getNotList} from '../../utils/borrowed_porduct'

Page({
    data: {
        tabs: ["待还图书", "借用图书", "超时图书"],// 0  1  2
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0,
        sqlLsit:[],
        ristList: [],
        wxId: 'oR5YB5SwlSZS0m-RqCXFMhkxAVr0',//测试用,
        notRistList:[]
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
        this.getListOfRist();
        this.getListOfRist();
    },
    tabClick: function (e) {
        var _this = this;
        console.log(e);
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
        if (_this.data.activeIndex == 0) {
            console.log('列表');
            this.getNotReturnList();
        } else if (_this.data.activeIndex == 1) {
            console.log('待还');
            this.getListOfRist();
        } else {
            console.log('我的书评');
        }
    },
    getListOfRist: function () {
        var _this = this;
        var wxId = wx.getStorageSync('third_Session');
        var param = {
            wxId: (wxId || _this.data.wxId)
        }
        getBorrowListById(param).then((res) => {
            var aimd = res.data.data;
            _this.setData({
                sqlLsit:aimd
            })
            var today = new Date().getTime()
            var resultmap = aimd.map((e) => {
                var returnDay = new Date(e.actualReturnTime).getTime();
                if (e.actualReturnTime) {
                    var dayNum= Math.floor((returnDay -today ) / (1000 * 60 * 60 * 24));
                    if(dayNum<0){
                        e.actualReturnTime='逾期'+Math.abs(dayNum)+'天';
                        e.flag=true;
                    }else{
                        e.actualReturnTime='待还'+dayNum+'天';
                        e.flag=false;
                    }
                } else {
                    e.actualReturnTime= '已还';

                }
                return e;
            })
            _this.setData({
                ristList: resultmap
            })
        }).catch((e) => {
            console.log(e);
        });
    },
    getNotReturnList:function(){
       var toShowList=this.data.ristList;
       var today = new Date().getTime()
       var noRistList=toShowList.filter((e)=>{
           var returnDay = new Date(e.actualReturnTime).getTime();
           if (e.actualReturnTime!='已还') {
               return true;
           }else{
               return false;
           }
       });
        console.log(noRistList);
       this.setData({
           notRistList:noRistList
       })
    },
    giveback:function(totol){
        var bookCode = totol.target.dataset.hi;
        var wxId=wx.getStorageSync('third_Session')||this.data.wxId;
        console.log(bookCode,wxId);

    }
});