import http from './http';

function getBorrowListById(params){
    return  http.GET("/borrow/blist",params);
};
function addOrderByParams(params){
    return http.GET("/borrow/badd",params);
};
function giveBack(params){
    return http.GET("/borrow/giveback",params);
}
module.exports={
    getBorrowListById:getBorrowListById,
    addOrderByParams:addOrderByParams,
    giveBack:giveBack
};