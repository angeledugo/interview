import { Body, Controller, Get, Post, Query, UseGuards,  } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './services/company.service';
import { PageOptionsDto, PaginationTransformPipe } from '../constants/dto/pagination.request.dto';
import { Auth, GetUser } from '../auth/decorators';
import { Usuario } from '@prisma/client';


@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    
    @Get()
    @Auth()
    findAll(
      @GetUser() user: Usuario,
      @Query(new PaginationTransformPipe()) pagination: PageOptionsDto
    ) {
      return this.companyService.findAll(user, pagination);
    }


    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto) {
      return this.companyService.create(createCompanyDto);
    }
}
