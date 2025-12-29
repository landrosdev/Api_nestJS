import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [PrismaModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
