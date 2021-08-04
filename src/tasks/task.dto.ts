import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly completed: boolean;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly favorites: number;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
