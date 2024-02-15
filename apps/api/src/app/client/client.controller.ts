import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientService } from './services/client.service';

import { PageOptionsDto, PaginationTransformPipe } from '../constants/dto/pagination.request.dto';

@Controller('clients')
export class ClientController {

    constructor(private readonly clientService: ClientService) {}
    
    @Get()
    findAll(
      @Query(new PaginationTransformPipe()) pagination: PageOptionsDto
    ) {
      return this.clientService.findAll(pagination);
    }

    @Post()
    create(@Body() clientDto: CreateClientDto) {
      return this.clientService.create(clientDto);
    }

}
