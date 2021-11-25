import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestsEntityController } from './tests-entity.controller';
import { TestsEntityService } from './tests-entity.service';
import { TestsRepository } from './tests.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TestsRepository])],
  controllers: [TestsEntityController],
  providers: [TestsEntityService],
})
export class TestsEntityModule {}
