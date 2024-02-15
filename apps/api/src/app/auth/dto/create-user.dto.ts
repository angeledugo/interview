import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export enum Role {
    ADMIN = 'admin',
    CLIENT = 'client',
  }

export class CreateUserDto {
    
    
    @IsString()
    username: string;

    @IsString()
    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;

    @IsOptional()
    clientId: number; 
}
