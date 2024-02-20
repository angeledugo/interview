import { Injectable, Logger } from '@nestjs/common';
import { CreatePaymentConfigDto } from '../dto/create-payment-config.dto';
import { PrismaService } from 'nestjs-prisma';
import handleDbExceptions from '../../constants/exceptions/error.db.exception';

@Injectable()
export class PaymentService {

    private readonly logger = new Logger('CompanyService');

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async createPaymentConfig(clientId,createPaymentConfigDto: CreatePaymentConfigDto) {
        const { amount, ...paymentConfigData } = createPaymentConfigDto;

        const floatAmount = parseFloat(createPaymentConfigDto.amount.toString());
       try {
        const paymentConfig = await this.prisma.paymentConfig.create({
          data: {
            ...paymentConfigData,
            amount: floatAmount
          }
        })
        
        if(paymentConfig) {
          const paymentConfigId = paymentConfig.id;

          await this.prisma.client.update({
            where: {
              id: clientId, // ID del cliente
            },
            data: {
              paymentConfigId: paymentConfigId,
            },
          });

          const cliente = await this.prisma.client.findUnique({
            where: {
              id: clientId, // ID del cliente
            },
            include: {
              paymentConfig: true,
            },
          });

          return { client: { ...cliente }};
        }
        //
        
        } catch (error) {
          handleDbExceptions(error, this.logger);
        }
    }
}
