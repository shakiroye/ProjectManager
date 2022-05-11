package com.shakiroye.projectmanager.controller;

import com.shakiroye.projectmanager.model.TaskLog;
import com.shakiroye.projectmanager.model.UserLog;
import com.shakiroye.projectmanager.service.UserLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "project-manager")
@CrossOrigin
public class UserLogController {
    private final UserLogService userLogService;

    @Autowired
    public UserLogController(UserLogService userLogService) {
        this.userLogService = userLogService;
    }

    @GetMapping("/user-log/all")
    public ResponseEntity<List<UserLog>> getUserLogs(){
        List<UserLog> userLogs = userLogService.getUserLogs();
        return new ResponseEntity<>(userLogs, HttpStatus.OK);
    }

    @GetMapping("/user-log/find/{id}")
    public ResponseEntity<UserLog> getUserLogById(@PathVariable("id") Integer id){
        UserLog userLog = userLogService.findUserLogById(id);
        return new ResponseEntity<>(userLog, HttpStatus.OK);
    }

    @PostMapping("/{actionUsername}/user-log/add")
    public ResponseEntity<UserLog> addUserLog(@RequestBody UserLog userLog, @PathVariable("actionUsername") String actionUsername){
        UserLog newUserLog = userLogService.addUserLog(userLog, actionUsername);
        return new ResponseEntity<>(newUserLog, HttpStatus.CREATED);
    }
}
