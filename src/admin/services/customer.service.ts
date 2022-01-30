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
  ) { }

  create(createCustomerDto: CreateCustomerDto): Promise<ChatUserEntity> {
    return this.chatUserRepository.createUser(createCustomerDto);
  }

  findAllHOLD(req, botId = null) {
    if (botId) {
      return this.chatUserRepository.find({ where: { "bot.botId": botId } });
    } else {
      return this.chatUserRepository.find({ where: { "owner.userId": req.user.owner.userId } });
    }
  }

  async findAll(req, botId = null) {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * (limit) || 0;
    const [result, total] = await this.chatUserRepository.findAndCount({
      where: { "owner.userId": req.user.owner.userId },
      order: { createdAt: 'DESC'},
      take: limit,
      skip: skip
    });
    return {
      data: result,
      count: total
    }
  }

  findOne(id: string) {
    return this.chatUserRepository.findOne(id, { relations: ["bot"] });
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.chatUserRepository.updateUser(updateCustomerDto);
  }

  remove(id: string) {
    return `This action removes a #${id} customer`;
  }
}
