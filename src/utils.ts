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
  const week = "星期" + "日一二三四五六".charAt(date.getDay());
  return `今天是${year}年${month}月${day}日 ${week}`;
}

/**
 * 获取天气
 */
const getWeather = () => {
  axios({
    method: "get",
    url: "https://v0.yiketianqi.com/api?unescape=1",
    params: {
      ...weatherParams
    }
  }).then(res => {
    if (res.status === 200) {
      /**
       * city: 城市名称
       * wea: 实时天气情况
       * tem: 实时温度
       * tem1: 高温
       * tem2: 低温
       * humidity: 湿度
       * air_tips: 空气tips
       * kaichuang: 开窗
       */
      const { city, wea, tem, tem1, tem2, humidity } = res.data;
      const { air_tips, kaichuang } = res.data.api;
      console.log(res)
    }
  })
}

/**
 * 获取早安心语
 */
const goodMorningHeartLanguage = () => {
  const { key } = tianApiParams;
  axios({
    method: "get",
    url: "http://api.tianapi.com/zaoan/index",
    params: {
      key
    }
  }).then(res => {
    if (res.status === 200) {
      console.log(res["data"]["newslist"][0]["content"])
    }
  })
}
