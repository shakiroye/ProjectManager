package com.shakiroye.projectmanager.controller;

import com.shakiroye.projectmanager.model.User;
import com.shakiroye.projectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "project-manager")
@CrossOrigin
public class UserController {
    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/all")
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/user/all/withpass")
    public ResponseEntity<List<User>> getUsersWithPassword(){
        List<User> users = userService.findAllUsersWithPass();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/user/find/{username}")
    public ResponseEntity<User> getUserById(@PathVariable("username") String username){
        User user = userService.findByUsername(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/user/find/{username}/{password}")
    public ResponseEntity<User> getUserByIdAndPassword(@PathVariable("username") String username,
                                                       @PathVariable("password") String password){
        User user = userService.findByUsernameAndPassword(username, password);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/user/find/admins")
    public ResponseEntity<User> getAdmins(){
        User admins = userService.findAllAdmins();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    @PostMapping("/{actionUsername}/user/add")
    public ResponseEntity<User> addUser(@RequestBody User user, @PathVariable("actionUsername") String actionUsername){
        User newUser = userService.addUser(user, actionUsername);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/{actionUsername}/user/update")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable("actionUsername") String actionUsername){
        User updateUser = userService.updateUser(user, actionUsername);
        return new ResponseEntity<>(updateUser, HttpStatus.OK);
    }

    @DeleteMapping("/{actionUsername}/user/delete/{username}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("actionUsername") String actionUsername,
                                            @PathVariable("username") String username){
        userService.removeUser(username, actionUsername);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
