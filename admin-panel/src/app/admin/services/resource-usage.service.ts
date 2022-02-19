import { Injectable } from '@angular/core';
import { ApiHttpService } from 'src/app/shared/services';
import { adminApi } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class ResourceUsageService {
	
	constructor(
    public http : ApiHttpService,
  ) { }

	getUsages(){
    const url = adminApi.resourceUsage.findAll;
    return this.http.get(url);
  }

  getUsageById(botId:string){
    const url = adminApi.bot.findOne+'/'+botId;
    return this.http.get(url);
  }

  createUsage(obj:any){
      const body = obj;
      const url = adminApi.resourceUsage.create;
      return this.http.post(url, body);
  } 

  updateUsageById(obj:any){
      const body = obj;
      const url = adminApi.resourceUsage.update+'/'+obj.botId;
      return this.http.put(url, body);
  }
  deleteUsageById(botId:string){
    const url = adminApi.resourceUsage.remove+'/'+botId;
    return this.http.delete(url);
  }
	
}
