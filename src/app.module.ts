import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TestsEntityModule } from './tests-entity/tests-entity.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'test-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    TestsEntityModule,
  ],
})
export class AppModule {}
