import { IsInt, IsString, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskListDto } from './create-task-list.dto';

export class UpdateTaskListDto extends PartialType(CreateTaskListDto) {
  @IsInt()
  public readonly id: number;

  @IsString()
  @MaxLength(255)
  public readonly title: string;
}
