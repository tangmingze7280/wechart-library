import http from './http'

/**
 * 新增 收藏
 * @param userCode
 * @param bookCode
 */
function updataCollection(userCode,bookCode){

    return http.GET("/collection/updataCollection",{userCode:userCode,bookCode:bookCode});
}

function deleteCollection(userCode,bookCode){
    return http.GET("/collection/deleteCollection",{userCode:userCode,bookCode:bookCode})
}
function getConllections(userCode="oR5YB5SwlSZS0m-RqCXFMhkxAVr0",pageSize=5,pageNum){
    return http.GET("/collection/getCollectionsList",{userCode:userCode,pageSize:pageSize,pageNum:pageNum});
}



module.exports={
    updataCollection:updataCollection,
    deleteCollection:deleteCollection,
    getConllections:getConllections
}