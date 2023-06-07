import { ResPage, Order } from "@/api/interface/index";
import http from "@/api";

/**
 * @name 用户管理模块
 */
// 获取用户列表
export const getOrderList = (params: Order.ReqOrderParams) => {
  return http.get<ResPage<Order.ResOrderList>>(
    "https://mock.mengxuegu.com/mock/647ee835a94cc2376cb36446/example/orders",
    params,
    {
      absoluteUrl: true
    }
  );
};
