import { BadRequestException, Injectable, Logger} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateClientDto } from '../dto/create-client.dto';
import { PrismaService } from 'nestjs-prisma';
import { ErrorCode } from '../../constants/glob/error';
import handleDbExceptions from '../../constants/exceptions/error.db.exception';
import { ClientCreatedEvent } from '../events/cliente-created.event';
import { Role } from '../../auth/dto/create-user.dto';

import { PageMetaDto } from '../../constants/dto/page.meta.dto';
import { PageDto } from '../../constants/dto/page.dto';
import { PageOptionsDto } from '../../constants/dto/pagination.request.dto';

@Injectable()
export class ClientService {

    private readonly logger = new Logger('ClientService');

    constructor(
        private eventEmitter: EventEmitter2,
        private readonly prisma: PrismaService
    ) {}

    async findAll(paginationDto: PageOptionsDto) {
      const { take = 10, skip = 0 } = paginationDto;
      const query =  await this.prisma.client.findMany({
        skip: skip,
        take: take,
      });

      const itemCount = await this.prisma.client.count();
      const pageOptionsDto = {
          take: paginationDto.take,
          page: paginationDto.page,
          skip: paginationDto.skip
      }
        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });


        
        return new PageDto(query, pageMetaDto);
    }

    async create(createClientDto: CreateClientDto) {
        
        const { email,companyId,  ...clientData } = createClientDto;
        
        const verification = await this.prisma.usuario.findUnique({ where: { email } });

        if (verification) {
            if (verification['email'] === email) {
              throw new BadRequestException({ codeError: ErrorCode.EMAILUNIQUE });
            } else {
              throw new BadRequestException({ codeError: ErrorCode.UNKNOWN });
            }
        }
        const company = parseInt(companyId.toString());
        try {
          const cliente = await this.prisma.client.create({ 
            data: {
              ...clientData,
              companyId: company
            }
            
          });

          const username = email.match(/^[^@]+/)[0].replace(/\W/g, '');

          const clientCreatedEvent = new ClientCreatedEvent({username: username, email:email, password: "123456", clientId: cliente.id,role:Role.CLIENT});

          this.eventEmitter.emit('client.created', clientCreatedEvent);


          return { cliente: { ...cliente }};
        } catch (error) {
          handleDbExceptions(error, this.logger);
        }
    }
}
