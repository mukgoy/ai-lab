import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io, Socket } from "socket.io-client";
import { ChatMessageEntity, ChatUserEntity } from "src/app/shared/entities";
import { SocketData, userbotApi } from "../enums";
import { ApiHttpService } from "./api-http.service";

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private socket: Socket = {} as Socket;
    public isReady: boolean = false;
    public msgQueue: ChatMessageEntity[] = [];
    constructor(
        public http: ApiHttpService,
    ) { }

    connect(data: SocketData) {
        this.socket = io('http://localhost:3000/chat');
        this.setSocketData(data)
    }

    setSocketData(data: SocketData) {
        this.socket.emit('setSocketData', data, (res: boolean) => {
            if (res) { 
                this.isReady = true 
                this.checkQueue()
            }
        });
    }

    joinRoom(room: string) {
        this.socket.emit('joinRoom', room);
    }

    sendMessage(message: ChatMessageEntity) {
        if (this.isReady) {
            console.log('message', message);
            this.socket.emit('message', message);
        } else {
            this.msgQueue.push(message)
        }
    }

    checkQueue() {
        if (this.msgQueue.length > 0) {
            this.msgQueue.forEach(item => {
                this.sendMessage(item);
            })
            this.msgQueue = [];
        }
    }

    getOnlineUsers(data: any):Promise<ChatUserEntity[]> {
        return new Promise((resolve, reject)=>{
            this.socket.emit('getOnlineUsers', data, resolve);
        })
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

    getPreviousMessages(selectedUser: ChatUserEntity, offset: string = "") {
        return this.http.get(userbotApi.getPreviousMessages, { room: selectedUser.id, offset })
    }
}