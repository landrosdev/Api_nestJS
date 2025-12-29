import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Faire les courses' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Acheter du lait et des œufs', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
