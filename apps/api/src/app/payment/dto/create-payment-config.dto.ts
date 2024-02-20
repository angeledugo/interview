import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";


export enum PaymentType {
    HOUR = 'hour',
    MONTHLY = 'monthly',
  }


export class CreatePaymentConfigDto {
    
    
    @IsEnum(PaymentType)
    @IsNotEmpty()
    paymentType: PaymentType;


    @IsNumber()
    amount: number;

}