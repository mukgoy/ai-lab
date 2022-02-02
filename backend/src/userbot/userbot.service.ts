import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BotRepository } from 'src/globals/repository/bot.repository';
import { ChatMessageRepository } from 'src/globals/repository/chat-message.repository';
import { ChatUserRepository } from 'src/globals/repository/chat-user.repository';
import { FaqRepository } from 'src/globals/repository/faq.repository';
import { LessThan } from 'typeorm';
import { CreateChatUserDto } from './dto/create-chat-user.dto';
import { UpdateChatUserDto } from './dto/update-chat-user.dto';

@Injectable()
export class UserbotService {

  constructor(
    @InjectRepository(BotRepository) private readonly botRepository: BotRepository,
    @InjectRepository(FaqRepository) private readonly faqRepository: FaqRepository,
    @InjectRepository(ChatUserRepository) private readonly chatUserRepository: ChatUserRepository,
    @InjectRepository(ChatMessageRepository) private readonly chatMessageRepository: ChatMessageRepository


  ) { }

  getFaqs(botId: string) {
    return this.faqRepository.find({ where: { bot: { botId: botId } } });
  }

  getBot(botId: string) {
    return this.botRepository.findOne(botId);
  }

  async createChatUser(createChatUserDto: CreateChatUserDto) {
    const user = await this.chatUserRepository.createUser(createChatUserDto);
    return user;
  }

  updateChatUser(updateChatUserDto: UpdateChatUserDto) {
    return this.chatUserRepository.updateUser(updateChatUserDto);
  }

  getPreviousMessagesHold(room: string, offset: string = "") {
    // let where:any = {room: room};
    // if(offset > 0){
    //   where.id = LessThan(offset)
    // }
    // return this.chatMessageRepository.find({
    //   where: where,
    //   order: { id: "DESC" },
    //   take: 10,
    // });
  }

  getPreviousMessages(room: string, offset: string = "") {
    let where: any = { room: room };
    if (offset) {
      where.id = LessThan(offset)
    }
    console.log(where)
    return this.chatMessageRepository.find({
        where: ""
    });
  }
}
