import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateFaqDto {
    
    @IsString()
    @ApiProperty()
    public question: string;

    @IsString()
    @ApiProperty()
    public answer: string;

    @IsString()
    @ApiProperty()
    public botId: number;

    public req?: any

}
