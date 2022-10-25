// 微信公众号接口
export interface IWeChatParams {
  appid: string;
  secret: string;
  touser: string;
  template_id: string;
}

// 天气接口
export interface IWeatherParams {
  appid: number;
  appsecret: string;
  version: string;
  cityid: number;
  city: string;
}
