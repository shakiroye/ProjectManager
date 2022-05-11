package com.shakiroye.projectmanager.controller;

import com.shakiroye.projectmanager.model.TaskLog;
import com.shakiroye.projectmanager.service.TaskLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "project-manager")
@CrossOrigin
public class TaskLogController {
    private final TaskLogService taskLogService;

    @Autowired
    public TaskLogController(TaskLogService taskLogService) {
        this.taskLogService = taskLogService;
    }

    @GetMapping("/task-log/all")
    public ResponseEntity<List<TaskLog>> getTaskLogs(){
        List<TaskLog> taskLogs = taskLogService.getTaskLogs();
        return new ResponseEntity<>(taskLogs, HttpStatus.OK);
    }

    @GetMapping("/task-log/find/{id}")
    public ResponseEntity<TaskLog> getTaskLogById(@PathVariable("id") Integer id){
        TaskLog taskLog = taskLogService.findTaskLogById(id);
        return new ResponseEntity<>(taskLog, HttpStatus.OK);
    }

    @GetMapping("/{actionUsername}/task-log/find/{username}")
    public ResponseEntity<List<TaskLog>> getTaskLogByUser(@PathVariable("username") String username,
                                                  @PathVariable("actionUsername") String actionUsername){
        List<TaskLog> taskLog = taskLogService.findTaskLogByUser(username, actionUsername);
        return new ResponseEntity<>(taskLog, HttpStatus.OK);
    }

    @PostMapping("/{actionUsername}/task-log/add")
    public ResponseEntity<TaskLog> addTaskLog(@RequestBody TaskLog taskLog, @PathVariable("actionUsername") String actionUsername){
        TaskLog newTaskLog = taskLogService.addTaskLog(taskLog, actionUsername);
        return new ResponseEntity<>(newTaskLog, HttpStatus.CREATED);
    }

    @PutMapping("/{actionUsername}/task-log/update")
    public ResponseEntity<TaskLog> updateTaskLog(@RequestBody TaskLog taskLog, @PathVariable("actionUsername") String actionUsername){
        TaskLog updateTaskLog = taskLogService.updateTaskLog(taskLog, actionUsername);
        return new ResponseEntity<>(updateTaskLog, HttpStatus.OK);
    }

    @DeleteMapping("/{actionUsername}/task-log/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("actionUsername") String actionUsername,
                                            @PathVariable("id") Integer id){
        taskLogService.removeTaskLog(id, actionUsername);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
