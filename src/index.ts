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
 * @param {*} hour 小时
 * @param {*} minute 分钟
 * @param {*} callTask 任务函数
 */
const setScheduledTask = (hour: number, minute: number, callTask: Function) => {
  let taskTime = new Date();
  taskTime.setHours(hour);
  taskTime.setMinutes(minute);
  let timeDiff = taskTime.getTime() - (new Date()).getTime(); // 获取时间差
  timeDiff = timeDiff > 0 ? timeDiff : (timeDiff + 24 * 60 * 60 * 1000);
  setTimeout(function() {
    callTask(); // 首次执行
    setInterval(callTask, 24 * 60 * 60 * 1000); // 24小时为循环周期
  }, timeDiff);
}

setScheduledTask(9, 0, () => {
  start();
});
