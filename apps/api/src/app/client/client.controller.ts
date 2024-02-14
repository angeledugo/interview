import { Body, Controller, Post } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientService } from './services/client.service';

@Controller('client')
export class ClientController {

    constructor(private readonly clientService: ClientService) {}
    
    @Post()
    create(@Body() clientDto: CreateClientDto) {
      return this.clientService.create(clientDto);
    }

}
