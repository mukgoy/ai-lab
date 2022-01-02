import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignupDto {
    
    @IsString()
    @ApiProperty()
    public name: string;

    @IsString()
    @ApiProperty()
    public email: string;

    @IsString()
    @ApiProperty()
    public password: string;

    @IsString()
    @ApiProperty()
    public cpassword: string;

}
