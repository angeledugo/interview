import { Module } from '@nestjs/common';

import { CompanyController } from './company.controller';
import { PrismaService } from 'nestjs-prisma';
import { CompanyService } from './services/company.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [PrismaService,CompanyService ],  
  controllers: [CompanyController],
  imports: [AuthModule]
})
export class CompanyModule {}
