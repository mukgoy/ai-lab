import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFaqDto } from '../dto/create-faq.dto';
import { UpdateFaqDto } from '../dto/update-faq.dto';
import { FaqEntity } from '../../globals/entities/faq.entity';
import { FaqRepository } from 'src/globals/repository/faq.repository';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(FaqRepository)
    private readonly faqRepository: FaqRepository,
  ) {}

  create(createFaqDto: CreateFaqDto): Promise<FaqEntity> {
    return this.faqRepository.createFaq(createFaqDto);
  }

  findAll(req, botId = null) {
    if (botId) {
      return this.faqRepository.find({ where: { 'bot.botId': botId } });
    } else {
      return this.faqRepository.find({
        where: { 'owner.userId': req.user.owner.userId },
      });
    }
  }

  findOne(id: string) {
    return this.faqRepository.findOne(id, { relations: ['bot'] });
  }

  update(id: string, updateFaqDto: UpdateFaqDto) {
    return this.faqRepository.updateFaq(updateFaqDto);
  }

  public async remove(req: any, id: string): Promise<any> {
    const faq: FaqEntity = await this.faqRepository.findOne(id);

    if (!faq) throw new NotFoundException(`Faq with ID ${id} Not Found`);
    await this.faqRepository.delete(faq);
    return { msg: `This action removes a #${id} faq` };
  }
}
