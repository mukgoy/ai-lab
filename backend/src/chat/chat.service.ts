import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { ChatMessageEntity } from 'src/globals/entities';
import { ChatMessage, SenderType } from 'src/globals/enums';
import { ChatMessageRepository } from 'src/globals/repository/chat-message.repository';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessageRepository)
    private readonly chatRepository: ChatMessageRepository
  ) { }

  public connectedUsers: any = {};

  async saveChat(chat: ChatMessageEntity): Promise<void> {
    const createdChat = this.chatRepository.create(chat);
    await createdChat.save();
  }

  userConnected(socket: Socket) {
    this.connectedUsers[socket.data.room] = this.connectedUsers[socket.data.room] || { sockets: [] };
    this.connectedUsers[socket.data.room].sockets.push(socket.id);
    this.connectedUsers[socket.data.room].data = socket.data;
    console.log(this.connectedUsers)
  }

  setLastMessage(socket: Socket, chat: ChatMessage){
    console.log(socket.data);
    socket.data.user.lastMessage = chat
    this.connectedUsers[socket.data.room].data = socket.data;
    const createdChat = this.chatRepository.create(new ChatMessageEntity(chat));
    createdChat.save();
  }

  userDisconnected(socket: Socket) {
    if (socket.data.senderType == SenderType.USER) {
      let index = this.connectedUsers[socket.data.room].sockets.indexOf(socket.id);
      if (index !== -1) {
        this.connectedUsers[socket.data.room].sockets.splice(index, 1);
      }
      if (this.connectedUsers[socket.data.room].sockets.length == 0) {
        delete this.connectedUsers[socket.data.room];
      }
    }
  }

  getConnectedUsers(data: any) {
    let users = [];
    // console.log(this.connectedUsers)
    for (let room in this.connectedUsers) {
      let socketdata = this.connectedUsers[room].data;
      if (data.botId && socketdata.botId == data.botId) {
        users.push(socketdata.user)
      } else if (data.botIds && data.botIds.indexOf(socketdata.botId) > -1) {
        users.push(socketdata.user)
      }
    }
    return users
  }

}
