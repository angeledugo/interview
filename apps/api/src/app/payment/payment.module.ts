import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  providers: [PrismaService,PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
