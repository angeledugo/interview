import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { CreatePaymentConfigDto } from './dto/create-payment-config.dto';

@Controller('payment')
export class PaymentController {

    constructor(private readonly paymentService: PaymentService) {}

    /*  
    @Get()
    @Auth()
    findAll(
      @GetUser() user: Usuario,
      @Query(new PaginationTransformPipe()) pagination: PageOptionsDto
    ) {
      return this.companyService.findAll(user, pagination);
    }*/


    @Post('payment-config/client/:clientId')
    createPaymentConfig(
      @Param('clientId', ParseIntPipe) clientId: number,
      @Body() createPaymentConfigDto: CreatePaymentConfigDto) {
      return this.paymentService.createPaymentConfig(clientId,createPaymentConfigDto);
    }
}
