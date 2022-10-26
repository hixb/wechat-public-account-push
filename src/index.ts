import { weChatParams } from "./config";
import { getToken } from "./token";
import { sendMsg } from "./sendMsg";
import { IImplementParams } from "./interface";

/**
 * 执行
 */
const start = async () => {
  const access_token = await getToken(weChatParams);
  await sendMsg({ access_token, ...weChatParams });
}

/**
 * 延时执行函数
 * @param config
 * @param func
 */
const timeoutFunc = (config: IImplementParams, func: any) => {
  config.runNow && func();
  const nowTime: number = new Date().getTime();
  const timePoints: number[] = config.time.split(":").map(i => parseInt(i));
  let recent: number = new Date().setHours.apply(null, (timePoints as any));
  recent >= nowTime || (recent += 24 * 3600000);
  setTimeout(() => {
    func();
    setInterval(func, config.interval * 3600000);
  }, recent - nowTime);
};

timeoutFunc(
  {
    interval: 1, // 间隔天数, 间隔为整数
    runNow: false, // 是否立即运行
    time: "09:39:00" // 执行的时间点 时在0~23之间
  },
  start()
)
