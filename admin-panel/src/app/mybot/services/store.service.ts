import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BotEntity, ChatUserEntity } from 'src/app/shared/entities';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  ls = localStorage;

  bots: BotEntity[] = [];
  onlineUsers: ChatUserEntity[] = []

  bot?: BotEntity;
  selectedUser?: ChatUserEntity;

  public botUserSubject: BehaviorSubject<ChatUserEntity>;
  constructor() {
    const userJson = this.ls.getItem('botUser');
    let user = userJson !== null ? JSON.parse(userJson) : {};
    this.botUserSubject = new BehaviorSubject<ChatUserEntity>(user);
  }
  set botUser(user: ChatUserEntity) {
    this.ls.setItem('botUser', JSON.stringify(user));
    this.botUserSubject.next(user);
  }
  get botUser() {
    return this.botUserSubject.value;
  }

}
