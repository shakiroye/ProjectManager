package com.shakiroye.projectmanager.service;

import com.shakiroye.projectmanager.model.Project;
import com.shakiroye.projectmanager.model.Task;
import com.shakiroye.projectmanager.model.User;
import com.shakiroye.projectmanager.repository.TaskRepo;
import com.shakiroye.projectmanager.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepo taskRepo;
    private final UserRepo userRepo;
    private final ProjectService projectService;


    @Autowired
    public TaskService(TaskRepo taskRepo, UserRepo userRepo, ProjectService projectService) {
        this.taskRepo = taskRepo;
        this.userRepo = userRepo;
        this.projectService = projectService;
    }

    public List<Task> getTasks(){
        return taskRepo.findAll();
    }

    public Task findTaskById(Integer taskId){
        return taskRepo.findById(taskId)
                .orElseThrow(() -> new IllegalStateException("La tache avec l'id "+taskId+" n'existe pas"));
    }

    public Task addTask(Task task, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);
        task.setTaskLogs(new ArrayList<>());
        Project project = this.projectService.findProjectById(task.getProjectId());
        task.setProject(project);

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }else{
            taskRepo.save(task);
        }
        return task;
    }

    public void removeTask(Integer taskId, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }
        boolean exists = taskRepo.existsById(taskId);
        if(!exists){
            throw new IllegalStateException("La tache avec l'id " + taskId + " n'existe pas");
        }else{
            taskRepo.deleteById(taskId);
        }

    }

    public Task updateTask(Task task, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }else{
            taskRepo.save(task);
        }
        return task;
    }
}
