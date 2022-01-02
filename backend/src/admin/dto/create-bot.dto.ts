import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { BotDefaultJsondata } from "../entities/bot.entity";

export class CreateBotDto {
    
    @IsString()
    @ApiProperty()
    public name: string;

    @ApiProperty()
    public jsondata: BotDefaultJsondata;

    public req?: any

}
