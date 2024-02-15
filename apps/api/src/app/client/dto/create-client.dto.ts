import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateClientDto {
    
    @IsString()
    email: string
    
    @IsString()
    firstname: string;

    @IsString()
    @IsEmail()
    lastname: string;
    
    @IsString()
    @MinLength(6)
    address: string;

    
    @IsString()
    @MinLength(6)
    password: string;
}