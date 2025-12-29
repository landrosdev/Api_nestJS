import { Module } from '@nestjs/common';
import { PrismaService } from './db.client';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
