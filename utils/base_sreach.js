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
function getBookInfoByBookName(bookName){
   
    let promise=http.GET("/book/getBookInfoByBookName",bookName)
    return promise;
}

function getBookNameForSreach(simpleTitle={simpleTitle:'哲学的感悟'}){

    let promise=http.GET("/book/getBookNameForSreach",simpleTitle)
    return promise;
}
function getBookInfoBySomeOne(param={classif:'',runking:'',history:'',collection:'',pageSize:0,pageNum:0}){
    let promise=http.GET("/book/getBookInfoBySomeOne",param)
    return promise;
}
module.exports={
    getClassifList:getClassifList,
    getBookListByClassif:getBookListByClassif,
    getBookInfoByBookName:getBookInfoByBookName,
    getBookNameForSreach:getBookNameForSreach,
    getBookInfoBySomeOne:getBookInfoBySomeOne,
    URL:http.URL
}