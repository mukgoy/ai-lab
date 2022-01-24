import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public botId: string = "";
  public botUserSubject: BehaviorSubject<any>;
  ls = localStorage;
  constructor() {
    const userJson = this.ls.getItem('botUser');
    let user = userJson !== null ? JSON.parse(userJson) : {};
    this.botUserSubject = new BehaviorSubject<any>(user);
  }

  set botUser(user: any) {
    this.ls.setItem('botUser', JSON.stringify(user));
    this.botUserSubject.next(user);
  }

  get botUser() {
    return this.botUserSubject.value;
  }

  public botConfig: BehaviorSubject<any> = new BehaviorSubject<any>({
    "businessId": 5,
    "jsondata": {
      "isGradient": true,
      "bgColor1": "#50cccc",
      "bgColor2": "#45aeca",
      "textColor": "#FFFFFF",
      "header": {
        "title": "Ascent Info Solutions",
        "logo": "http://localhost:4200/assets/mybot/images/bot-icon.png"
      },
      "launcher": {
        "icon": "http://blog.chatboot.com/images/logo.svg",
        "text": "Ask us"
      }
    }
  });

}
