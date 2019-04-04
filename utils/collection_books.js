import http from './http'

/**
 * 新增 收藏
 * @param userCode
 * @param bookCode
 */
function updataCollection(userCode,bookCode){

    return http.PUT("/collection/updataCollection",{userCode:userCode,bookCode:bookCode});
}

function deleteCollection(userCode,bookCode){
    return http.DELETE("/collection/deleteCollection",{userCode:userCode,bookCode:bookCode})
}

/**
 * 根据收藏推荐图书
 * @param userCode
 * @param bookCode
 */
function selectRecommendByCollection(userCode,bookCode){
    return http.GET("/book/selectRecommendByCollection")
}
module.exports={
    updataCollection:updataCollection,
    deleteCollection:deleteCollection,
    selectRecommendByCollection:selectRecommendByCollection
}