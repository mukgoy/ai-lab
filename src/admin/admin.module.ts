import { Module } from '@nestjs/common';
import { BotController } from './controllers/bot.controller';
import { BotService } from './services/bot.service';
import { FaqController } from './controllers/faq.controller';
import { FaqService } from './services/faq.service';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './controllers/customer.controller';

@Module({
  controllers: [BotController, FaqController, UploadController, CustomerController],
  providers: [BotService, FaqService, UploadService, CustomerService],
  
})
export class AdminModule {}
