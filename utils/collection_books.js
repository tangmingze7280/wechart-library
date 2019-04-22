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
    return http.DELETE("/collection/deleteCollection",{userCode:userCode,bookCode:bookCode})
}



module.exports={
    updataCollection:updataCollection,
    deleteCollection:deleteCollection
}