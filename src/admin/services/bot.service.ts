import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBotDto } from '../dto/create-bot.dto';
import { UpdateBotDto } from '../dto/update-bot.dto';
import { BotEntity } from '../../globals/entities/bot.entity';
import { BotRepository } from 'src/globals/repository/bot.repository';

@Injectable()
export class BotService {

  constructor(
    @InjectRepository(BotRepository)
    private readonly botRepository: BotRepository
  ) {}

  create(createBotDto: CreateBotDto):Promise<BotEntity> {
    return this.botRepository.createBot(createBotDto);
  }

  findAll(req) {
    return this.botRepository.find({
      where: {
        "owner.userId": req.user.owner.userId
      }
    });
  }

  findOne(id: string) {
    return this.botRepository.findOne(id);
  }

  update(id: string, updateBotDto: UpdateBotDto) {
    return this.botRepository.updateBot(updateBotDto);
  }

  remove(id: string) {
    return `This action removes a #${id} bot`;
  }
}
