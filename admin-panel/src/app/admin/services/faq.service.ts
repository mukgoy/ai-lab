import { Injectable } from '@angular/core';
import { ApiHttpService } from 'src/app/shared/services';
import { adminApi } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(
    public http : ApiHttpService,
  ) { }

  getFaqs(){
    const url = adminApi.faq.findAll;
    return this.http.get(url);
  }

  getFaqById(faqId:number){
    const url = adminApi.faq.findAll+'/'+faqId;
    return this.http.get(url);
  }

  createFaq(obj:any){
      const body = obj;
      const url = adminApi.faq.create;
      return this.http.post(url, body);
  } 

  updateFaqById(obj:any){
      const body = obj;
      const url = adminApi.faq.update+'/'+obj.faqId;
      return this.http.put(url, body);
  }

  deleteFaqById(faqId:number){
    const url = adminApi.faq.remove+'/'+faqId;
    return this.http.delete(url);
  }
}
