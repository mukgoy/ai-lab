import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserbotService } from './userbot.service';

@ApiTags("userbot")
@Controller('userbot')
export class UserbotController {
  constructor(private readonly userbotService: UserbotService) {}

  @Get("get-faqs/:botId")
  getFaqs(@Param('botId') botId: number) {
    return this.userbotService.getFaqs(botId);
  }

  @Get("get-botui/:botId")
  async getBotUi(@Param('botId') botId: number) {
    let botUi = await this.userbotService.getBotUi(botId);
    botUi.jsondata = JSON.parse(botUi.jsondata)
    return botUi
  }
}
