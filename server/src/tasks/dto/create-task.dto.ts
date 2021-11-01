import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(255)
  public readonly title: string;

  @IsString()
  public readonly description: string;

  @IsInt()
  public readonly list: number;
}
