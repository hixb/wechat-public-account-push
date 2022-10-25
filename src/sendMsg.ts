import axios from "axios";

export const sendMsg = (params: any) => {
  return axios.post(
    `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${params["access_token"]}`,
    {
      ...params,
      data: params["data"] || {}
    }
  )
}
