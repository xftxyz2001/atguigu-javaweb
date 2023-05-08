import request from "../utils/request/"

// portal/findAllTypes
//获取分类列表
export const getfindAllTypes = () => {
  return request.get("portal/findAllTypes");
};
// 分页带条件查询所有头条
export const getfindNewsPageInfo = (info) => {
  return request.post("portal/findNewsPage",info);
};
// 查看头条详情
export const getshowHeadlineDetail = (id) => {
    return request({
        method: "post",
        url: "portal/showHeadlineDetail",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
         data:`hid=${id}`
  });
};

//删除的回调
// headline/removeByHid
export const removeByHid = (id) => {
    return request({
         method: "post",
            url: "headline/removeByHid",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            data:`hid=${id}`
  })
};

//登录的接口
export const getUserInfo = (info) => {
  return request.post("user/login",info);
};
