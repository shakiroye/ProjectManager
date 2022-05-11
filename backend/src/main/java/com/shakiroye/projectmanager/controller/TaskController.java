package com.shakiroye.projectmanager.controller;

import com.shakiroye.projectmanager.model.Task;
import com.shakiroye.projectmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "project-manager")
@CrossOrigin
public class TaskController {
    private final TaskService taskService;
    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/task/all")
    public ResponseEntity<List<Task>> getTasks(){
        List<Task> tasks = taskService.getTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/task/find/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable("id") Integer id){
        Task task = taskService.findTaskById(id);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PostMapping("/{username}/task/add")
    public ResponseEntity<Task> addTask(@RequestBody Task task, @PathVariable("username") String username){
        Task newTask = taskService.addTask(task, username);

        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }

    @PutMapping("/{username}/task/update")
    public ResponseEntity<Task> updateTask(@RequestBody Task task, @PathVariable("username") String username){
        Task updateTask = taskService.updateTask(task, username);
        return new ResponseEntity<>(updateTask, HttpStatus.OK);
    }

    @DeleteMapping("/{username}/task/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("username") String username,
                                            @PathVariable("id") Integer id){
        taskService.removeTask(id, username);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
