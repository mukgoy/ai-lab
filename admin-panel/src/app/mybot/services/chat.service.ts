import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io, Socket } from "socket.io-client";
import { ChatMessage } from "../enums";

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private socket:Socket = {} as Socket;

    connect(data:{ botId:number, user:any, room:string }){
        this.socket = io('http://localhost:3000/chat');
        this.joinRoom(data)
    }

    joinRoom(data: any) {
        console.log('joinRoom', data)
        this.socket.emit('joinRoom', data);
    }

    sendMessage(message: ChatMessage) {
        this.socket.emit('message', message);
    }

    newMessageReceived() {
        let observable = new Observable<ChatMessage>(observer => {
            this.socket.on('new message', (data:ChatMessage) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });
        return observable;
    }
}