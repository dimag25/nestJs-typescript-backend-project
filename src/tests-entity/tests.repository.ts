import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateOrUpdateTestDTO } from './DTO/createorUpdate-test.dto';
import { Test } from './test.entity';

@EntityRepository(Test)
export class TestsRepository extends Repository<Test> {
  async createTest(createTestDTO: CreateOrUpdateTestDTO) {
    const { name, description, className, actions } = createTestDTO;
    const test = this.create({
      name,
      description,
      className,
      actions,
    });
    await this.save(test);
    return test;
  }

  async updateTask(
    _updateTestDto: CreateOrUpdateTestDTO,
    id: string,
  ): Promise<UpdateResult> {
    const { name, description, className, actions } = _updateTestDto;
    const testToUpdate = await this.update(id, {
      name,
      description,
      className,
      actions,
    });
    return testToUpdate;
  }

  async getTests() {
    const query = this.createQueryBuilder('test');
    return await query.getMany();
  }
}
