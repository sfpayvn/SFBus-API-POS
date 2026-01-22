import { FileService } from '@/module/core/file/file/file.service';
import { FileDocument } from '@/module/core/file/file/schema/file.schema';
import { forwardRef, Inject, Injectable, StreamableFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Model, Types } from 'mongoose';
import { PosFileDto } from './dto/pos-file.dto';

type Request = FastifyRequest;
type Response = FastifyReply;

@Injectable()
export class PosFileService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(FileDocument.name) private readonly fileModel: Model<FileDocument>,
    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,
  ) {}

  async upload(request: any, folderId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosFileDto[]> {
    return this.fileService.upload(request, folderId, tenantId);
  }

  async download(
    id: string,
    request: Request,
    response: Response,
    tenantId: Types.ObjectId,
  ): Promise<StreamableFile | undefined> {
    return this.fileService.download(id, request, response, tenantId);
  }

  async viewFile(id: string, response: Response): Promise<StreamableFile> {
    return this.fileService.viewFile(id, response);
  }
}
