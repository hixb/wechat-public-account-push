import { weChatParams, executionTimeParams } from "./config";
import { getToken } from "./token";
import { sendMsg } from "./sendMsg";
import { IImplementParams } from "./interface";

/**
 * 执行函数
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
const timeoutFunc = async(config: IImplementParams | any, func: Function) => {
  config.runNow && func();
  const date = new Date();
  const nowTime: number = date.getTime();
  const [hours, min, sec] = config.time.split(":").map((i: string) => parseInt(i));
  let recent: number = date.setHours(hours, min, sec);
  recent >= nowTime || (recent += 24 * 3600000);
  setTimeout(async () => {
    await func();
    setInterval(func, config.interval * 3600000);
  }, recent - nowTime);
};

timeoutFunc(executionTimeParams, () => {
  start()
});
