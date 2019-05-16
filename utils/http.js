const DEV_URL="https://127.0.0.1:80/library";//开发api路径
// const DEV_URL="https://www.gttview.club/library"//生产api路径
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
function PUT(url, params='') {
    let promise = new Promise(function (resolve, reject) {
        wx.request({
            url: DEV_URL+url,
            data: params,
            method: 'PUT',
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
function DELETE(url, params='') {
    let promise = new Promise(function (resolve, reject) {
        wx.request({
            url: DEV_URL+url,
            data: params,
            method: 'DELETE',
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
    GET:GET,
    URL:DEV_URL,
    DELETE:DELETE,
    PUT:PUT
}