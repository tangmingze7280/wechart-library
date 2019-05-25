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
/**
 *
 * @param userCode
 * @param bookCode
 */
function getBookInfoBySomeOne(param={classif:'',runking:'',history:'',collection:'',pageSize:0,pageNum:0}){
    let promise=http.GET("/book/getBookInfoBySomeOne",param)
    return promise;
}
function getCountNumBookRead(param){
    let promise=http.GET("/borrow/getCountNumBookRead",param)
    return promise;
}
function getBookPage(param){
    let promise=http.GET("/borrow/getBookPage",param)
    return promise;
}
module.exports={
    getClassifList:getClassifList,
    getBookListByClassif:getBookListByClassif,
    getBookInfoByBookName:getBookInfoByBookName,
    getBookNameForSreach:getBookNameForSreach,
    getBookInfoBySomeOne:getBookInfoBySomeOne,
    getCountNumBookRead:getCountNumBookRead,
    getBookPage:getBookPage,
    URL:http.URL
}