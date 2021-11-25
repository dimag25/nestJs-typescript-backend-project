import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { FilterTasksDTO } from './DTO/filter-task.dto';
import { UpdateTaskDTO } from './DTO/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  //   @Get()
  //   getAllTasks(): Task[] {
  //     return this.tasksService.getAllTasks();
  //   }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDTO: CreateTaskDTO) {
    return await this.tasksService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string): Promise<void> {
    return await this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatusById(
    @Body() status: UpdateTaskDTO,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatusById(status, id);
  }

  @Get()
  getAllTasks(@Query() filterDTO: FilterTasksDTO): Promise<Task[]> {
    return this.tasksService.getTasksWithFilters(filterDTO);
  }
}
