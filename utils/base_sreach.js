import http from './http.js'

function getClassifList(){
    let promise=http.GET("/class/getClassisfList")
    return promise;
}
function getBookListByClassif(className){
    if(!className){
        return;
    }
    let promise=http.GET("/book/getBookListByClassif",className)
    return promise;
}
function getBookInfoByBookName(bookName="哲学的感悟"){
   
    let promise=http.GET("/book/getBookInfoByBookName",bookName)
    return promise;
}



module.exports={
    getClassifList:getClassifList,
    getBookListByClassif:getBookListByClassif,
    getBookInfoByBookName:getBookInfoByBookName
}