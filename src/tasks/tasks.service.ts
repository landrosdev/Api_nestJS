import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/db.client';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    return this.prisma.task.create({ data: dto });
  }

  async findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: number, dto: UpdateTaskDto) {
    await this.findOne(id); // vérifie si existe
    return this.prisma.task.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id); // vérifie si existe
    return this.prisma.task.delete({ where: { id } });
  }
}
