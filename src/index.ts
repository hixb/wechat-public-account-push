import params from "./config";
import { getToken } from "./token";
import { sendMsg } from "./sendMsg";

const start = async () => {
  const access_token = await getToken(params);
  await sendMsg({ access_token, ...params });
}

start();
