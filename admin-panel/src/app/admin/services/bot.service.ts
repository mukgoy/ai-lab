import { Injectable } from '@angular/core';
import { ApiHttpService } from 'src/app/shared/services';
import { adminApi } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(
    public http : ApiHttpService,
  ) { }

  getBots(){
    const url = adminApi.bot.findAll;
    return this.http.get(url);
  }

  getBotById(botId:string){
    const url = adminApi.bot.findOne+'/'+botId;
    return this.http.get(url);
  }

  createBot(obj:any){
      const body = obj;
      const url = adminApi.bot.create;
      return this.http.post(url, body);
  } 

  updateBotById(obj:any){
      const body = obj;
      const url = adminApi.bot.update+'/'+obj.botId;
      return this.http.put(url, body);
  }
  deleteBotById(botId:string){
    const url = adminApi.bot.remove+'/'+botId;
    return this.http.delete(url);
  }
}
