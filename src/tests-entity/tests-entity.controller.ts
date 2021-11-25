import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateOrUpdateTestDTO } from './DTO/createorUpdate-test.dto';
import { Test } from './test.entity';
import { TestsEntityService } from './tests-entity.service';

@Controller('tests')
export class TestsEntityController {
  constructor(private testsService: TestsEntityService) {}

  @Get()
  getAllTests(): Promise<Test[]> {
    return this.testsService.getAllTests();
  }

  @Get('/:id')
  async getTestById(@Param('id') id: string): Promise<Test> {
    return await this.testsService.getTestById(id);
  }

  @Post()
  async createTask(@Body() createTestDTO: CreateOrUpdateTestDTO) {
    return await this.testsService.createTest(createTestDTO);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string): Promise<void> {
    return await this.testsService.deleteTestById(id);
  }
}
