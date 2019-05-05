import http from './http';

function getBorrowListById(params){
    return  http.GET("/borrow/blist",params);
};
function addOrderByParams(params){
    return http.GET("/borrow/badd",params);
};
/*function getBorrowListById(){
    http.GET("/borrow/badd","");
};
function getBorrowListById(){
    http.GET("/borrow/badd","");
};*/
module.exports={
    getBorrowListById:getBorrowListById,
    addOrderByParams:addOrderByParams
};