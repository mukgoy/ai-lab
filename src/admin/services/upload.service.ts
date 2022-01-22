import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUploadDto } from '../dto/create-upload.dto';
import { UploadEntity } from '../../globals/entities/upload.entity';
import { UploadRepository } from 'src/globals/repository/upload.repository';

@Injectable()
export class UploadService {

  constructor(
    @InjectRepository(UploadRepository)
    private readonly uploadRepository: UploadRepository
  ) { }

  create(createUploadDto: CreateUploadDto): Promise<UploadEntity> {
    return this.uploadRepository.createUpload(createUploadDto);
  }

  findAll(req) {
    return this.uploadRepository.find({
      where: {
        owner: req.user.owner.userId
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
