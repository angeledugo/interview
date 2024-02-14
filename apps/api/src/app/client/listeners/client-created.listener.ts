import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ClientCreatedEvent } from '../events/cliente-created.event';

@Injectable()
export class ClientCreatedListener {
  @OnEvent('client.created')
  handleOrderCreatedEvent(event: ClientCreatedEvent) {
    console.log(event);
  }
}