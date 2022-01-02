import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotController } from './controllers/bot.controller';
import { BotService } from './services/bot.service';
import repositories from './repository';
import { FaqController } from './controllers/faq.controller';
import { FaqService } from './services/faq.service';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';

@Module({
  controllers: [BotController, FaqController, UploadController],
  providers: [BotService, FaqService, UploadService],
  imports: [
    TypeOrmModule.forFeature([
      ...repositories
    ]),
  ],
})
export class AdminModule {}
