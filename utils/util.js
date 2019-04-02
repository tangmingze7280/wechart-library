/**
 *
 * @param msg 提示信息 default msg
 * @returns {boolean} 确定/不确定
 */
var wxalert=(msg='操作失败，请重新操作！')=>{
    let operatingInformation=''//操作信息
    wx.showModal({
        content: msg,
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