import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { Action } from 'src/action/action.entity';

export class CreateOrUpdateTestDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  className: string;

  @IsNotEmptyObject()
  actions: Action[];
}
