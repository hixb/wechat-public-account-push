import {
  IWeChatParams,
  IWeatherParams,
  IImplementParams,
  ITianApiParams,
  IBirthdayParams
} from "./interface";

// 原微信服务号id
// appID: wx793aa3cb3d7d26f9
// appsecret: af1d942a4ef1f6d64765935ae242fa45

// 测试微信服务号id
// appID: wx475f1615da469ac3
// appsecret: dee6fcb93ff3b2bba802753bb2a9840a

// my: oAXSp6GvKRcy1UaPKaUDPLcV3ByI
// 莹: oAXSp6Dafux_aZQtgQ_J-wQqodYM

const weChatParams: IWeChatParams = {
  appid: "wx475f1615da469ac3",
  secret: "dee6fcb93ff3b2bba802753bb2a9840a",
  touser: "oAXSp6Dafux_aZQtgQ_J-wQqodYM",
  template_id: "ihL9WKJ8ZPprPnWNLLVL_9lhErusymZdI382YZKoLpA"
}

// 天气api参数 => https://tianqiapi.com/index/doc
const weatherParams: IWeatherParams = {
  appid: 75623248,
  appsecret: "3lPw8n6A",
  version: "v9",
  cityid: 101120101,
  city: "济南市"
}

// 定点发送时间参数
const executionTimeParams: IImplementParams = {
  interval: 1, // 间隔天数, 间隔为整数
  runNow: false, // 是否立即运行
  time: "09:00:00" // 执行的时间点 时在0~23之间
}

// 天行数据api => https://www.tianapi.com/console/
const tianApiParams: ITianApiParams = {
  key: "59150eb68dcda3c0e7df31ab84ad3478"
}

// 生日时间
const birthdayParams: IBirthdayParams = {
  time: [2001, 11, 9]
}

export {
  weChatParams,
  weatherParams,
  executionTimeParams,
  tianApiParams,
  birthdayParams
}
