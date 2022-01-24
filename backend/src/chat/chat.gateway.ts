import {  ConnectedSocket,  MessageBody,  SubscribeMessage,  WebSocketGateway, WebSocketServer, WsResponse,} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { ChatService } from './chat.service';
import { Bind, UseInterceptors } from '@nestjs/common';
import { ChatMessageEntity } from 'src/globals/entities';
import { Socket } from 'socket.io';
import { ChatMessage, SenderType, SocketData } from 'src/globals/enums';

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
  async handleNewMessage(socket: Socket, data: ChatMessage) {
    console.log(`${data.senderType}:${data.senderId} send the message in room : ${data.room}: ${data.message}`);
    socket.broadcast.to(data.room.toString()).emit('message', data);
    this.chatService.setLastMessage(socket, data)
    if(data.senderType == SenderType.USER){
      socket.broadcast.to(SenderType.BOT + data.botId).emit('lastMessage', data);
    }
  }

  @SubscribeMessage('joinRoom')
  joinRoom(socket: Socket, data: SocketData) {
    if(data.senderType == SenderType.USER){
      let room = data.room;
      data.user.room = room;
      socket.data = data
      socket.join(room);
      // console.log("joinRoom", data);
      console.log(`${data.senderType} of id = ${data.user.id} joined the room : ${room}`);
      socket.broadcast.to(SenderType.BOT + data.botId).emit('joinRoom', data);
      this.chatService.userConnected(socket)
    }else{
      socket.join(SenderType.BOT + data.botId);
    }
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(socket: Socket, data: any) {
    // console.log(data.user + 'left the room : ' + data.room);
    socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});
    socket.leave(data.room);
  }

  @SubscribeMessage('getOnlineUsers')
  getOnlineUsers(socket: Socket, data: any) {
    console.log("getOnlineUsers");
    socket.emit('getOnlineUsers', this.chatService.getConnectedUsers(data));
  }
}
