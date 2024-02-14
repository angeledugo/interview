import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { HelloCommand } from '@ocmi/api/commands/hello.command';
import { PrismaModule } from 'nestjs-prisma';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    PrismaModule, AuthModule, ClientModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    // HelloCommand
  ],
})
export class AppModule {}
