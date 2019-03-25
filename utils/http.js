const DEV_URL="http://localhost:8999/library";//开发api路径
const PROP_URL=""//代替者
function POST(url, params) {
    let promise = new Promise(function (resolve, reject) {
        wx.request({
            url: DEV_URL+url,
            data: params,
            method: 'POST',
            success: function (res) {
                resolve(res);
            },
            fail:function (e) {
                reject(e)
            }
        })
    });
    return promise
}
//成功回调then  失败回调 catch
function GET(url, params) {
    let promise = new Promise(function (resolve, reject) {
        wx.request({
            url: DEV_URL+url,
            data: params,
            method: 'POST',
            success: function (res) {
                resolve(res);
            },
            fail:function (e) {
                reject(e)
            }
        })
    });
    return promise
}
module.exports={
    POST:POST,
    GET:GET
}