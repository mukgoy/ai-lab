import {  ConnectedSocket,  MessageBody,  SubscribeMessage,  WebSocketGateway, WebSocketServer, WsResponse,} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { ChatService, SocketData } from './chat.service';
import { Bind, UseInterceptors } from '@nestjs/common';
import { ChatMessageEntity } from 'src/globals/entities';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat',  cors: true  })
export class ChatGateway implements NestGateway {
  count = 0;
  constructor(private chatService: ChatService) { }

  @WebSocketServer()
  server;

  handleConnection(socket: any) {
    console.log('new connection made.');
    socket.emit('connected', "messages");
  }

  handleDisconnect(socket: any) {
    console.log('new desconnection made.');
    this.chatService.userDisconnected(socket)
  }
  
  @SubscribeMessage('message')
  async handleNewMessage(socket: Socket, data: any) {
    console.log("handleNewMessage", data);
    // console.log(data.senderId + 'send the message : ' + data.message);
    socket.broadcast.to(data.room).emit('new message', data);
  }

  @SubscribeMessage('joinRoom')
  joinRoom(socket: Socket, data: SocketData) {
    // console.log(socket);
    console.log(data);

    socket.data = data
    socket.join(data.room);
    console.log(data.user.id + ' joined the room : ' + data.room);
    socket.broadcast.to(data.room).emit('new user joined', 'user has joined this room.');
    this.chatService.userConnected(socket)
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(socket: Socket, data: any) {
    console.log(data.user + 'left the room : ' + data.room);
    socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});
    socket.leave(data.room);
  }

  @SubscribeMessage('getOnlineUsers')
  getOnlineUsers(socket: Socket, data: any) {
    console.log("getOnlineUsers");
    socket.emit('getOnlineUsers', this.chatService.getConnectedUsers(data));
  }
}
