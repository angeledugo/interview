import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './services/client.service';
import { PrismaService } from 'nestjs-prisma';
import { ClientCreatedListener } from './listeners/client-created.listener';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ClientController],
  providers: [PrismaService,ClientService, ClientCreatedListener],
  imports: [AuthModule]
})
export class ClientModule {}
