import { weChatParams, executionTimeParams, weatherParams } from "./config";
import { getToken } from "./token";
import { sendMsg } from "./sendMsg";
import { IImplementParams } from "./interface";
import {
  getDate,
  getWeather,
  goodMorningHeartLanguage,
  daysRemainingOnBirthday
} from "./utils";

/**
 * 执行函数
 */
const start = async () => {
  const access_token = await getToken(weChatParams);
  const weather = await getWeather();
  const txt = await goodMorningHeartLanguage();
  const data = {
    nowDate: {
      value: getDate(),
      color: "#57e"
    },
    city: {
      value: weatherParams.city,
    },
    wea: {
      value: weather["wea"]
    },
    cur: {
      value: weather["tem"] + "℃"
    },
    low: {
      value: weather["tem2"] + "℃"
    },
    higt: {
      value: weather["tem1"] + "℃"
    },
    tips: {
      value: weather["air_tips"]
    },
    solar: {
      value: daysRemainingOnBirthday().solar
    },
    lunar: {
      value: daysRemainingOnBirthday().lunar
    },
    txt: {
      value: txt["txt"],
      color: "#15bde7"
    }
  }
  await sendMsg({ access_token, ...weChatParams, data });
}

/**
 * 延时执行函数
 * @param config
 * @param func
 */
// const timeoutFunc = async(config: IImplementParams | any, func: Function) => {
//   config.runNow && func();
//   const date = new Date();
//   const nowTime: number = date.getTime();
//   const [hours, min, sec] = config.time.split(":").map((i: string) => parseInt(i));
//   let recent: number = date.setHours(hours, min, sec);
//   recent >= nowTime || (recent += 24 * 3600000);
//   setInterval(() => {
//     console.log((recent - nowTime) / 1000 / 60 / 24)
//   }, 1000)
//   setTimeout(async () => {
//     await func();
//     setInterval(() => {
//       func();
//       console.log(config.interval)
//     }, config.interval * 3600000);
//   }, recent - nowTime);
// };
//
// timeoutFunc(executionTimeParams, () => {
//   start()
// });


/**
 * 设置每日定时任务
 * @param {*} targetHour 时辰
 */
function setRegular(targetHour: number) {
  let timeInterval, nowTime = new Date(), nowSeconds, targetSeconds;

  // 计算当前时间的秒数
  nowSeconds = nowTime.getHours() * 3600 + nowTime.getMinutes() * 60 + nowTime.getSeconds();

  // 计算目标时间对应的秒数
  targetSeconds = targetHour * 3600;

  //  判断是否已超过今日目标小时，若超过，时间间隔设置为距离明天目标小时的距离
  timeInterval = targetSeconds > nowSeconds ? targetSeconds - nowSeconds : targetSeconds + 24 * 3600 - nowSeconds;

  setTimeout(getProductFileList, timeInterval * 1000);
}

const getProductFileList = () => {
  start();
  setTimeout(getProductFileList, 24 * 3600 * 1000)//之后每天调用一次
}

setRegular(8);
