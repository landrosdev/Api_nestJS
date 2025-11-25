import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

    // Route to get all tasks
    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    // Route to create a new task
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
      return this.tasksService.createTask(createTaskDto.title);
    }

    // Route to mark a task as completed
    @Patch(':id')
    updateTask(
      @Param('id') id: string,
      @Body() updateTaskDto: UpdateTaskDto,
    ) {
      return this.tasksService.updateTask(+id, updateTaskDto);
    }


    // Route to delete a task 
    @Delete(':id')
    deleteTask(@Param('id') id: string) {
      return this.tasksService.deleteTask(+id);
    }
}