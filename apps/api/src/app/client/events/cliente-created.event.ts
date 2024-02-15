import { CreateUserDto } from "../../auth/dto/create-user.dto";


export class ClientCreatedEvent {
  constructor(public readonly usuario: CreateUserDto) {}
}