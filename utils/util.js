var wxalert=(msg)=>{
    let operatingInformation=''//操作信息
    wx.showModal({
        content: '操作失败，请重新操作！',
        showCancel: false,
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定')
                operatingInformation=true
            }else{
                operatingInformation=false;
            }
        }
    });
    return operatingInformation;
}

module.exports={
    wxalert:wxalert
}