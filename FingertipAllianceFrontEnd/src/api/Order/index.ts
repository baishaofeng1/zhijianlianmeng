import axios from "../../utils/request"

// 全部订单
export function getOrderAll(){
    return axios({
        url:"/api/api/order/all",
        method:"get"
    })
}

// 根据订单类型获取数据
export function getOrderType(params:any){
    return axios({
        url:"/api/api/order/type",
        method:"get",
        params
    })
}

/**
 * 支付相关
 */

/**
 * @title 生成订单
 * @param data Object = { title:"",totalFee:"" }
 * @returns 
 */
export function getCreateOrder(data:any){
    return axios({
        url:"http://39.106.54.110:7878/api/order/createOrder",
        method:"post",
        data
    })
}

/**
 * 支付订单
 */
export function getPayOrder(data:any){
    return axios({
        url:`http://39.106.54.110:7878/alipay/h5/pcPay/${ data.orderNo }`,
        method:"post"
    })
}