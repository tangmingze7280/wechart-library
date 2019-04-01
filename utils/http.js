const DEV_URL="https://127.0.0.1:8999/library";//开发api路径
const PROP_URL="https://www.gttview.club:8999/library"//生产api路径
function POST(url, params="") {
    let promise = new Promise(function (resolve, reject) {
        wx.request({
            url: DEV_URL+url,
            data: params?params:{},
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
function GET(url, params='') {
    let promise = new Promise(function (resolve, reject) {
        wx.request({
            url: DEV_URL+url,
            data: params,
            method: 'GET',
            success: function (res) {
                resolve(res);
                if(res.data.state!=200){
                    reject(res)
                }
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