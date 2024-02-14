import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    
    
    @IsString()
    nombre: string;

    @IsString()
    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(6)
    password: string;
}