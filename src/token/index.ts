import axios from "axios";
import * as path from "path";
import fs, { PathOrFileDescriptor } from "fs";
import moment from "moment";
import { IWeChatParams } from "../interface";

export const getToken = (params: IWeChatParams) => {
  return new Promise((resolve, reject) => {
    const tokenFile: PathOrFileDescriptor = path.join(__dirname, "token.json");
    fs.readFile(tokenFile, "utf-8", (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        reject(err);
      } else {
        if (data) {
          const token: any = JSON.parse(data);
          if (token["expires_in"] > moment().unix()) {
            resolve(token["access_token"]);
            return;
          }
        }
      }

      const { appid, secret }: IWeChatParams = params;
      axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`).then(res => {
        if (res["data"] && res["data"]["errcode"]) {
          reject(data);
          return;
        }
        resolve(res["data"]["access_token"]);
        const t = res["data"];
        t["expires_in"] = t["expires_in"] + moment().unix() - 1200;
        fs.writeFile(tokenFile, JSON.stringify(t), (err: any) => {
          if (err) {
            reject(err);
          }
        })
      })
    })
  })
}
