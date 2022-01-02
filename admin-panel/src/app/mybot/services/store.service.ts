import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  public botConfig: BehaviorSubject<any> = new BehaviorSubject<any>({
      "businessId":5,
      "ui":{
          "isGradient":true,
          "bgColor1":"#50cccc",
          "bgColor2":"#45aeca",
          "textColor":"#FFFFFF",
          "header":{
              "title":"Ascent Info Solutions",
              "logo":"http://localhost:4200/assets/mybot/images/bot-icon.png"
          },
          "launcher":{
              "icon":"http://blog.chatboot.com/images/logo.svg",
              "text":"Ask us"
          }
      }
  });


}
