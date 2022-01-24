import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io, Socket } from "socket.io-client";
import { ChatMessage, ChatUser, SenderType, SocketData, userbotApi } from "../enums";
import { ApiHttpService } from "./api-http.service";

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private socket: Socket = {} as Socket;

    constructor(
        public http: ApiHttpService,
    ) { }

    connect(data: SocketData) {
        this.socket = io('http://localhost:3000/chat');
        this.joinRoom(data)
    }

    joinRoom(data: SocketData) {
        // console.log('joinRoom', data)
        this.socket.emit('joinRoom', data);
    }

    sendMessage(message: ChatMessage) {
        this.socket.emit('message', message);
    }

    getOnlineUsers(data: any) {
        this.socket.emit('getOnlineUsers', data);
    }

    onMessageReceived(key: string) {
        let observable = new Observable<any>(observer => {
            this.socket.on(key, (data: any) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });
        return observable;
    }

    getPreviousMessages(room: string, offset: string = "") {
        return this.http.get(userbotApi.getPreviousMessages, {room, offset})
    }
}