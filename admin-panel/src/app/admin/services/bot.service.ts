import { Injectable } from '@angular/core';
import { adminApi } from '../enums';
import { ApiHttpService } from './api-http.service';

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

  getBotById(botId:number){
    const url = adminApi.bot.findAll+'/'+botId;
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

}
