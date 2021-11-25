import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrUpdateTestDTO } from './DTO/createorUpdate-test.dto';
import { Test } from './test.entity';
import { TestsRepository } from './tests.repository';

@Injectable()
export class TestsEntityService {
  constructor(
    @InjectRepository(TestsRepository)
    private testsRepository: TestsRepository,
  ) {}

  async getAllTests(): Promise<Test[]> {
    return await this.testsRepository.find();
  }

  async getTestById(id: string): Promise<Test> {
    //try to get test
    const isFound = await this.testsRepository.findOne(id);

    //if not found , throw an error(404 not found)
    if (!isFound) {
      throw new NotFoundException(`Test with ID: ${id} not found`);
    } else {
      return isFound;
    }
  }

  async createTest(createTestDTO: CreateOrUpdateTestDTO): Promise<Test> {
    return this.testsRepository.createTest(createTestDTO);
  }

  async deleteTestById(id: string): Promise<void> {
    //delete test from DB
    const results = await this.testsRepository.delete(id);
    if (results.affected === 0) {
      throw new NotFoundException(`Test with ID: ${id} not found`);
    }
  }
}
