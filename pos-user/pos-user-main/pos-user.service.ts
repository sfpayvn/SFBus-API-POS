// user.service.ts

import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from '@/module/core/user/user/user.service';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { PosRequestUpdateUserFieldDto, PosSearchUsersRes, PosUserDto } from './dto/pos-user.dto';
import { PosCreateUserDto } from './dto/pos-create-user.dto';
import { PosUpdatePasswordUserDto, PosUpdateUserDto, PosUpdateUserProfileDto } from './dto/pos-update-user.dto';

@Injectable()
export class PosUserService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) {}

  async create(PosCreateUserDto: PosCreateUserDto, tenantId?: Types.ObjectId): Promise<PosUserDto> {
    return this.userService.create(PosCreateUserDto, tenantId);
  }

  // C?p nh?t th�ng tin ngu?i d�ng
  async update(posUpdateUserProfileDto: PosUpdateUserProfileDto, tenantId: Types.ObjectId): Promise<PosUserDto> {
    return this.userService.update(posUpdateUserProfileDto, tenantId);
  }

  async updateUserField(
    userId: Types.ObjectId,
    fieldName: string,
    value: any,
    tenantId: Types.ObjectId,
  ): Promise<PosUserDto> {
    return this.userService.updateUserField(userId, fieldName, value, tenantId);
  }

  async updatePassword(
    userId: Types.ObjectId,
    PosUpdatePasswordUserDto: PosUpdatePasswordUserDto,
    tenantId: Types.ObjectId,
  ): Promise<PosUserDto> {
    return this.userService.updatePassword(userId, PosUpdatePasswordUserDto, tenantId);
  }

  // Tìm người dùng theo ID
  async findById(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosUserDto | null> {
    return this.userService.findById(userId, tenantId);
  }

  async findByIds(userIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<PosUserDto[] | null> {
    return this.userService.findByIds(userIds, tenantId);
  }

  // Tìm người dùng theo tên đăng nhập
  async findByPhoneNumber(phoneNumber: string, tenantId?: Types.ObjectId): Promise<PosUserDto | null> {
    return this.userService.findByPhoneNumber(phoneNumber, tenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<PosUserDto[]> {
    return this.userService.findAll(tenantId);
  }

  async findAllByRole(role: string, tenantId: Types.ObjectId): Promise<PosUserDto[]> {
    return this.userService.findAllByRole(role, tenantId);
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<PosUserDto> {
    return this.userService.findOne(id, tenantId);
  }

  async findByPhone(phoneNumber: string, tenantId: Types.ObjectId): Promise<PosUserDto> {
    return this.userService.findByPhone(phoneNumber, tenantId);
  }

  async findByEmail(email: string, tenantId: Types.ObjectId): Promise<PosUserDto> {
    return this.userService.findByEmail(email, tenantId);
  }

  async findOneByRole(role: string, tenantId: Types.ObjectId): Promise<PosUserDto> {
    return this.userService.findOneByRole(role, tenantId);
  }
}
