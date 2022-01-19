import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io } from "socket.io-client";
import { ChatMessage } from "../enums";

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private socket = io('http://localhost:3000/chat');
    user: any = null;
    room: string|number = "";
    init(user:any, room:string|number) {
        this.user = user;
        this.room = room;
        this.joinRoom({ user: this.user, room: this.room });
    }

    joinRoom(data: any) {
        this.socket.emit('joinRoom', data);
    }

    newUserJoined() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('new user joined', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });
        return observable;
    }

    leaveRoom(data: any) {
        this.socket.emit('leaveRoom', data);
    }

    userLeftRoom() {
        let observable = new Observable<{ user: String, message: String }>(observer => {
            this.socket.on('left room', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); }
        });

        return observable;
    }

    sendMessage(message: ChatMessage) {
        this.socket.emit('message', { user: this.user, room: this.room, message: message });
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