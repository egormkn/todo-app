import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsString, MaxLength } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsInt()
  public readonly id: number;

  @IsString()
  @MaxLength(255)
  public readonly title: string;

  @IsString()
  public readonly description: string;

  @IsBoolean()
  public readonly isDone: boolean;
}
