import axios from "axios";

export const sendMsg = (params: any) => {
  return axios({
    method: "post",
    url: `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${params["access_token"]}`,
    data: {
      ...params,
      data: params["data"] || {}
    }
  });
}
