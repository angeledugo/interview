import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateClientDto {
    
    
    @IsString()
    firstname: string;

    @IsString()
    @IsEmail()
    lastname: string;
    
    @IsString()
    @MinLength(6)
    address: string;
}