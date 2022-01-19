import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io, Socket } from "socket.io-client";
import { ChatMessage, SenderType } from "../enums";

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private socket:Socket = {} as Socket;
    
    connect(data:{ botId:number, user:any, room:string, senderType: SenderType}){
        this.socket = io('http://localhost:3000/chat');
        this.joinRoom(data)
    }

    joinRoom(data: any) {
        // console.log('joinRoom', data)
        this.socket.emit('joinRoom', data);
    }

    sendMessage(message: ChatMessage) {
        this.socket.emit('message', message);
    }

    getOnlineUsers(data: any) {
        this.socket.emit('getOnlineUsers', data);
    }

    onMessageReceived(key:string) {
        let observable = new Observable<ChatMessage>(observer => {
            this.socket.on(key, (data:ChatMessage) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });
        return observable;
    }
}