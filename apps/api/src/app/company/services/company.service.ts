import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCompanyDto } from '../dto/create-company.dto';
import handleDbExceptions from '../../constants/exceptions/error.db.exception';
import { ErrorCode } from '../../constants/glob/error';
import { PageOptionsDto } from '../../constants/dto/pagination.request.dto';
import { PageMetaDto } from '../../constants/dto/page.meta.dto';
import { PageDto } from '../../constants/dto/page.dto';
import { TypesRol } from '../../constants/glob/roles';

@Injectable()
export class CompanyService {
    private readonly logger = new Logger('CompanyService');

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findAll(user, paginationDto: PageOptionsDto) {

      const { take = 10, skip = 0 } = paginationDto;
      
      const query =  await this.prisma.company.findMany({
        where : user.role === TypesRol.Client ? { id: user.companyId } : {},
        skip: skip,
        take: take,
      });

      const itemCount = await this.prisma.company.count();
      const pageOptionsDto = {
          take: paginationDto.take,
          page: paginationDto.page,
          skip: paginationDto.skip
      }
        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });


        
        return new PageDto(query, pageMetaDto);
    }


    async create(createCompanyDto: CreateCompanyDto) {
        const { name } = createCompanyDto;

        const verification = await this.prisma.company.findFirst({where: {name}});
        

        if (verification) {
            if (verification['name'] === name) {
              throw new BadRequestException({ codeError: ErrorCode.EMAILUNIQUE });
            } else {
              throw new BadRequestException({ codeError: ErrorCode.UNKNOWN });
            }
        }
        
        try {
          const company = await this.prisma.company.create({ 
            data: {
              ...createCompanyDto
            }
            
          });

        


          return { company: { ...company }};
        } catch (error) {
          handleDbExceptions(error, this.logger);
        }
    }
}
