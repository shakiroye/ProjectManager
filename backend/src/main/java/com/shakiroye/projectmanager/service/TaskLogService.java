package com.shakiroye.projectmanager.service;

import com.shakiroye.projectmanager.model.Task;
import com.shakiroye.projectmanager.model.TaskLog;
import com.shakiroye.projectmanager.model.User;
import com.shakiroye.projectmanager.repository.TaskLogRepo;
import com.shakiroye.projectmanager.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TaskLogService {
    private final TaskLogRepo taskLogRepo;
    private final UserRepo userRepo;
    private final UserService userService;
    private final TaskService taskService;

    @Autowired
    public TaskLogService(TaskLogRepo taskLogRepo, UserRepo userRepo, UserService userService, TaskService taskService) {
        this.taskLogRepo = taskLogRepo;
        this.userRepo = userRepo;
        this.userService = userService;
        this.taskService = taskService;
    }

    public List<TaskLog> getTaskLogs(){
        return taskLogRepo.findAll();
    }

    public TaskLog findTaskLogById(Integer taskLogId){
        return taskLogRepo.findById(taskLogId)
                .orElseThrow(() -> new IllegalStateException("le journal de taches avec l'id "+taskLogId+" n'existe pas"));
    }

    public List<TaskLog> findTaskLogByUser(String username, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);
        List<TaskLog> taskLogOptional = taskLogRepo.findByUsername(username);

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }else{
            if (taskLogOptional.isEmpty()
                    || taskLogOptional == null){
                throw new IllegalStateException("l'utilisateur " + username +" n'a pas de journal de taches");
            }else{
                return taskLogOptional;           }
        }
    }

    public TaskLog addTaskLog(TaskLog taskLog, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);
        User user = this.userService.findByUsername(taskLog.getUsername());
        Task task = this.taskService.findTaskById(taskLog.getTaskId());

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }else{
            taskLog.setUser(user);
            taskLog.setTask(task);
            taskLogRepo.save(taskLog);
        }
        return taskLog;
    }

    public void removeTaskLog(Integer taskLogId, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);
        Optional<TaskLog> taskLogOptional = taskLogRepo.findById(taskLogId);

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }
        boolean exists = taskLogRepo.existsById(taskLogId);
        if(!exists){
            throw new IllegalStateException("le journal de taches avec l'id " + taskLogId + " n'existe pas");
        }else{
                taskLogRepo.deleteById(taskLogId);
        }

    }

    public TaskLog updateTaskLog(TaskLog taskLog, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }else{
            taskLogRepo.save(taskLog);
        }
        return taskLog;
    }
}
