import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateChatUserDto } from './dto/create-chat-user.dto';
import { UpdateChatUserDto } from './dto/update-chat-user.dto';
import { UserbotService } from './userbot.service';

@ApiTags("userbot")
@Controller('userbot')
export class UserbotController {
  constructor(private readonly userbotService: UserbotService) {}

  @Get("get-faqs/:botId")
  getFaqs(@Param('botId') botId: number) {
    return this.userbotService.getFaqs(botId);
  }

  @Get("get-bot/:botId")
  async getBot(@Param('botId') botId: number) {
    let bot = await this.userbotService.getBot(botId);
    bot.jsondata = JSON.parse(bot.jsondata)
    bot.onboardjson = JSON.parse(bot.onboardjson)
    return bot
  }

  @Post("create-user")
  async createChatUser(@Body() createChatUserDto: CreateChatUserDto) {
    return this.userbotService.createChatUser(createChatUserDto).catch(err=>{
      return err
      if(err.code == "ER_DUP_ENTRY"){
        throw new BadRequestException(
          'Account with this email already exists.',
        );
      }
    });
  }

  @Put('update-user')
  updateChatUser(@Body() updateChatUserDto: UpdateChatUserDto) {
    return this.userbotService.updateChatUser(updateChatUserDto);
  }

  @Get("get-previous-messages")
  async getPreviousMessages(@Query('room') room: string = "", @Query('offset') offset: number = 0) {
    return this.userbotService.getPreviousMessages(room, +offset);
  }
}
