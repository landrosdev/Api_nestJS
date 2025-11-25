import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    
    // Sample in-memory tasks data
    private tasks = [
        { id: 1, title: 'Apprendre NestJS', completed: false },
        { id: 2, title: 'Créer un premier endpoint', completed: true },
    ];

    // Logique pour récupérer toutes les tâches
    getAllTasks() {
        return this.tasks;
    }

    // Logique pour créer une nouvelle tâche
    createTask(title: string) {
    const newTask = {
      id: this.tasks.length + 1,
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

    // logique pour marquer une tâche comme complétée
    completeTask(id: number) {
    const task = this.tasks.find(t => t.id === id);
        if (!task) {
            return { message: 'Tâche non trouvée' };
        }
        task.completed = true;
        return task;
    }

    // Logique pour mettre à jour une tache 
    updateTask(id: number, updateData: Partial<{ title: string }>) {
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
        return { message: 'Tâche non trouvée' };
    }

    Object.assign(task, updateData);
    return task;
    }


    // Logique pour supprimer une tache 
    deleteTask(id: number) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
        return { message: 'Tâche non trouvée' };
    }
    const deleted = this.tasks.splice(index, 1);
    return { message: 'Tâche supprimée', task: deleted[0] };
    }


}
