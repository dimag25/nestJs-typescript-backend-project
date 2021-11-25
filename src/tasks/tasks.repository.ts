import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { FilterTasksDTO } from './DTO/filter-task.dto';
import { UpdateTaskDTO } from './DTO/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDTO: CreateTaskDTO) {
    const { title, description } = createTaskDTO;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }

  async updateTask(
    _updateTaskDto: UpdateTaskDTO,
    id: string,
  ): Promise<UpdateResult> {
    const { status } = _updateTaskDto;
    const taskToUpdate = await this.update(id, { status });
    return taskToUpdate;
  }

  async getTasks(filterDTO: FilterTasksDTO) {
    const { status, search } = filterDTO;
    const query = this.createQueryBuilder('task');

    //do something with status
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    // do something with search filter
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();

    return tasks;
  }
}
