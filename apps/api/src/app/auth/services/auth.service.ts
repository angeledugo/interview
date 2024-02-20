import { BadRequestException, Logger, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ErrorCode } from '../../constants/glob/error';
import { JwtPayload } from '../interfaces';
import { JwtService } from '@nestjs/jwt';
import handleDbExceptions from '../../constants/exceptions/error.db.exception';



@Injectable()
export class AuthService {
    private readonly logger = new Logger('AuthService');

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser (email, password): Promise<any> {

        

        const user = await this.prisma.usuario.findUnique(
            { where: { email },
            include: {
                cliente: {
                    include: {
                        company: true
                    }
                },
            },   
         },
        );

        if (!user) {
            throw new UnauthorizedException('UnauthorizedException');
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('UnauthorizedException');
        }

        if(user) return user;
    }

    async signIn(user: any) {
        const payload = {
            id: user.id,
            email: user.email,
            name: user.nombre,
            clientId: user.clientId,
            role: user.role,
            companyId: user.cliente.companyId
          };
        
          return { user: {...payload}, token:  this.jwtService.sign(payload) };
    }

    async register(createUserDto: CreateUserDto) {
        const { password,  ...userData } = createUserDto;

        const email = userData.email;

        // verification user exists
        const verification = await this.prisma.usuario.findUnique({ where: { email } });

        if (verification) {
            if (verification['email'] === userData.email) {
              throw new BadRequestException({ codeError: ErrorCode.EMAILUNIQUE });
            } else {
              throw new BadRequestException({ codeError: ErrorCode.UNKNOWN });
            }
        }

        try {
            const user = await this.prisma.usuario.create({ 
                data: {
                    ...userData, password: bcrypt.hashSync(password, 3) 
                }
                
            });
      
            delete user.password;
            return { user: { ...user, token: this._getJwtToken({ id: user.id, email: user.email }) } };
          } catch (error) {
            handleDbExceptions(error, this.logger);
          }

    }

    private _getJwtToken(jwtpayload: JwtPayload) {
        return this.jwtService.sign(jwtpayload);
      }
}
