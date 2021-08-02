import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTaskDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsBoolean()
  @IsNotEmpty()
  readonly completed: boolean;
  @IsNumber()
  @IsNotEmpty()
  readonly favorites: number;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
