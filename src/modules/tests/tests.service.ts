import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestsService {
  constructor(@InjectRepository(Test) private repo: Repository<Test>) {}

  async create(createTestDto: CreateTestDto) {
    const createTest = this.repo.create(createTestDto);
    const save = await this.repo.save(createTest);
    return save;
  }

  findAll() {
    return this.repo.find({
      relations: ['consent'],
    });
  }
}
