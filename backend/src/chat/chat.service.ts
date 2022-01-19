import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { ChatMessageEntity } from 'src/globals/entities';
import { ChatMessageRepository } from 'src/globals/repository/chat-message.repository';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessageRepository)
    private readonly chatRepository: ChatMessageRepository
  ) {}

  public connectedUsers:any = {};

  async getChats(): Promise<ChatMessageEntity[]> {
    return await this.chatRepository.find();
  }

  async saveChat(chat: ChatMessageEntity): Promise<void> {
    const createdChat = this.chatRepository.create(chat);
    await createdChat.save();
  }

  userConnected(socket: Socket) {
    this.connectedUsers[socket.id] = socket.data;
  }

  userDisconnected(socket: Socket) {
    delete this.connectedUsers[socket.id];
  }

  getConnectedUsers(data:any){
    let users = [];
    for(let socketId in this.connectedUsers){
      let socketdata = this.connectedUsers[socketId];
      if(data.botId && socketdata.botId == data.botId){
        users.push(socketdata.user)
      }else if(data.botIds && data.botIds.indexOf(socketdata.botId) > -1){
        users.push(socketdata.user)
      }
    }
    return users
  }

}
