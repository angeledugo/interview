import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientCreatedEvent } from '../events/cliente-created.event';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class ClientCreatedListener {
  constructor(private readonly authService: AuthService) {}


  @OnEvent('client.created')
  async handleOrderCreatedEvent(event: ClientCreatedEvent) {
    const usuario = await this.authService.register(event.usuario);
  }
}