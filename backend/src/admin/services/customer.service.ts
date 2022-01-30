import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUserEntity } from 'src/globals/entities';
import { ChatUserRepository } from 'src/globals/repository/chat-user.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { BotService } from './bot.service';

@Injectable()
export class CustomerService {

  constructor(
    private botService: BotService,
    @InjectRepository(ChatUserRepository) private readonly chatUserRepository: ChatUserRepository,
  ) {}

  create(createCustomerDto: CreateCustomerDto):Promise<ChatUserEntity> {
    return this.chatUserRepository.createUser(createCustomerDto);
  }

  findAllHOLD(req, botId=null) {
    if(botId){
      return this.chatUserRepository.find({where:{"bot.botId":botId}});
    }else{
      return this.chatUserRepository.find({where:{"owner.userId": req.user.owner.userId}});
    }
  }

  async findAll(req, botId=null) {
    let botIds = [];
    if(botId){
      botIds = [botId]
    }else{
      let bots = await this.botService.findAll(req);
      botIds = bots.map(bot=>bot.botId.toString())
    }
    if(botIds.length > 0){
      return this.chatUserRepository.find({
        where: {
          "bot.botId": {$in: botIds}
        }
      });
    }else{
      return []
    }
    
  }

  findOne(id: string) {
    return this.chatUserRepository.findOne(id, {relations: [ "bot" ]});
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.chatUserRepository.updateUser(updateCustomerDto);
  }

  remove(id: string) {
    return `This action removes a #${id} customer`;
  }
}
