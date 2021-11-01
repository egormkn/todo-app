import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString, MaxLength } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @MaxLength(255)
  public readonly title: string;

  @IsString()
  public readonly description: string;

  @IsBoolean()
  public readonly isDone: boolean;
}
