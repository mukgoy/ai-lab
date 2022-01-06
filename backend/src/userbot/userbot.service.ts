import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BotRepository } from 'src/admin/repository/bot.repository';
import { FaqRepository } from 'src/admin/repository/faq.repository';

@Injectable()
export class UserbotService {

  constructor(
    @InjectRepository(BotRepository)
    private readonly botRepository: BotRepository,
    @InjectRepository(FaqRepository)
    private readonly faqRepository: FaqRepository
  ) {}
  
  getFaqs(botId:number) {
    return this.faqRepository.find({where:{bot:{botId:botId}}});
  }

  getBotUi(botId:number) {
    return this.botRepository.findOne(botId);
  }
}
