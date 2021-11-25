import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { FilterTasksDTO } from './DTO/filter-task.dto';
import { UpdateTaskDTO } from './DTO/update-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    //try to get task
    const isFound = await this.tasksRepository.findOne(id);

    //if not found , throw an error(404 not found)
    if (!isFound) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    } else {
      return isFound;
    }
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO);
  }

  async deleteTaskById(id: string): Promise<void> {
    //delete task from DB
    const results = await this.tasksRepository.delete(id);
    if (results.affected === 0) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }
  }

  async updateTaskStatusById(
    _updateTaskDto: UpdateTaskDTO,
    id: string,
  ): Promise<Task> {
    const task = this.getTaskById(id);
    await this.tasksRepository.updateTask(_updateTaskDto, id);
    return task;
  }

  async getTasksWithFilters(filterDTO: FilterTasksDTO): Promise<Task[]> {
    const tasks = await this.tasksRepository.getTasks(filterDTO);
    return tasks;
  }
}
