import { Module } from '@nestjs/common';
import { BotController } from './controllers/bot.controller';
import { BotService } from './services/bot.service';
import { FaqController } from './controllers/faq.controller';
import { FaqService } from './services/faq.service';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';

@Module({
  controllers: [BotController, FaqController, UploadController],
  providers: [BotService, FaqService, UploadService],
  
})
export class AdminModule {}
