import http from './http';

function getBorrowListById(params){
    return  http.GET("/borrow/blist",params);
};
function addOrderByParams(params){
    return http.GET("/borrow/badd",params);
};
/*function getNotList(params){
    return http.GET("/borrow/getNotList",params);
}*/
module.exports={
    getBorrowListById:getBorrowListById,
    addOrderByParams:addOrderByParams,
};