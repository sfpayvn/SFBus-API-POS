import { PosLoginUserDto } from './pos-login-user.dto';
import { OmitType } from '@nestjs/mapped-types';

export class PosSignInUserDto extends OmitType(PosLoginUserDto, ['tenantCode'] as const) {}
