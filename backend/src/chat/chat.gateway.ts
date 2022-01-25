import { SubscribeMessage,  WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { SocketData } from 'src/globals/enums';
import { ChatMessageEntity, ChatUserType } from 'src/globals/entities';

@WebSocketGateway({ namespace: 'chat',  cors: true  })
export class ChatGateway implements NestGateway {
  count = 0;
  constructor(private chatService: ChatService) { }

  @WebSocketServer()
  server;

  handleConnection(socket: any) {
    socket.emit('connected', "messages");
  }

  handleDisconnect(socket: any) {
    this.chatService.userDisconnected(socket)
  }
  
  @SubscribeMessage('setSocketData')
  async setSocketData(socket: Socket, data: SocketData): Promise<boolean> {
    // console.log("setSocketData", socket.data)
    let room:string = ChatUserType.USER + data.user.id;
    if(data.user.type != ChatUserType.USER){
      room = ChatUserType.BOT + data.bot.botId;
    }
    data.room = room
    socket.data = data
    socket.join(room);
    // console.log(`${data.user.type} of id = ${data.user.id} setSocketData with the room : ${room}`);
    if(data.user.type == ChatUserType.USER){
      this.chatService.userConnected(socket)
    }
    return true
  }

  @SubscribeMessage('joinRoom')
  joinRoom(socket: Socket, room: string) {
    console.log("joinRoom");
    socket.join(room);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(socket: Socket, data: any) {
    console.log("leaveRoom");
    socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});
    socket.leave(data.room);
  }

  @SubscribeMessage('message')
  async handleNewMessage(socket: Socket, data: ChatMessageEntity) {
    // console.log("handleNewMessage", data)
    data.room = data.room || socket.data.room;
    console.log(`${data.sender.type}:${data.sender.id} send the message in room : ${data.room}: ${data.message}`);
    socket.broadcast.to(data.room).emit('message', data);
    this.chatService.setLastMessage(socket, data)
    if(data.sender.type != ChatUserType.AGENT){
      socket.broadcast.to(ChatUserType.BOT + data.bot.botId).emit('lastMessage', data);
    }
  }

  @SubscribeMessage('getOnlineUsers')
  async getOnlineUsers(socket: Socket, data: any):Promise<any> {
    // console.log("getOnlineUsers", data);
    return this.chatService.getConnectedUsers(data)
  }
}
