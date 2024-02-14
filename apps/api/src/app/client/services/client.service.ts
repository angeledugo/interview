import { Injectable } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';

@Injectable()
export class ClientService {

    async create(clientDto: CreateClientDto) {
        return false;
    }
}
