import axios from "axios";
import { weatherParams, tianApiParams } from "./config";

/**
 * 获取日期
 */
const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  const day = (date.getDate() + 1 < 10 ? "0" : "") + date.getDate();
  const week = formatWeek(Number(date.getDay()));
  return `今天是${year}年${month}月${day}日 ${week}`;
}

/**
 * 处理星期
 * @param week
 */
const formatWeek = (week: number) => {
  let text: string = "";
  switch (week) {
    case 0:
      text = "星期日";
      break;
    case 1:
      text = "星期一";
      break;
    case 2:
      text = "星期二";
      break;
    case 3:
      text = "星期三";
      break;
    case 4:
      text = "星期四";
      break;
    case 5:
      text = "星期五";
      break;
    case 6:
      text = "星期六";
      break;
  }
  return text;
}

/**
 * 获取天气
 */
const getWeather = () => {
  const { appid, appsecret, version, cityid, city } = weatherParams;
  axios.get(
    `https://v0.yiketianqi.com/api?unescape=1&version=${version}&appid=${appid}&appsecret=${appsecret}&cityid=${cityid}&city=${city}`
  ).then(res => {
    console.log(res)
  })
}

/**
 * 早安心语
 */
const goodMorningHeartLanguage = () => {
  const { key } = tianApiParams;
  axios({ method: "get", url: "http://api.tianapi.com/zaoan/index",
    params: {
      key
    }
  }).then(res => {
    if (res.status === 200) {
      console.log(res["data"]["newslist"][0]["content"])
    }
  })
}
