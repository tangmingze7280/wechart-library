import http from './http.js'

function addReview(param){
    let promise=http.GET("/reviews/add",param)
    return promise;
}
function getListByUserId(param){
    let promise=http.GET("/reviews/getListUser",param)
    return promise;
}
function getListByBookCode(param){
    let promise=http.GET("/reviews/getListbookId",param)
    return promise;
}
function delOne(param){
    let promise=http.GET("/reviews/delListbookId",param)
    return promise;
}
module.exports={
    addReview:addReview,
    getListByUserId:getListByUserId,
    getListByBookCode:getListByBookCode,
    delOne:delOne,
    URL:http.URL
}