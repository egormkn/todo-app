import { IsString, MaxLength } from 'class-validator';

export class CreateTaskListDto {
  @IsString()
  @MaxLength(255)
  public readonly title: string;
}
