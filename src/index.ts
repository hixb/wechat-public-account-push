import { weChatParams } from "./config";
import { getToken } from "./token";
import { sendMsg } from "./sendMsg";

const start = async () => {
  const access_token = await getToken(weChatParams);
  await sendMsg({ access_token, ...weChatParams });
}

start();
