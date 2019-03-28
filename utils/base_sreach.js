import http from './http.js'

function getClassifList(){
    let promise=http.GET("/class/getClassisfList")
    return promise;
}
function getBookListByClassif(bookName){
    if(!bookName){
        return;
    }
    let promise=http.GET("/book/getBookListByClassif",{})
}
module.exports={
    getClassifList:getClassifList,
    getBookListByClassif:getBookListByClassif
}