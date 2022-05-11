package com.shakiroye.projectmanager.service;

import com.shakiroye.projectmanager.model.Company;
import com.shakiroye.projectmanager.model.TaskLog;
import com.shakiroye.projectmanager.model.User;
import com.shakiroye.projectmanager.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepo userRepo;
    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }
    public List<User> findAllUsers(){
        return userRepo.findAll();
    }

    public List<User> findAllUsersWithPass() {
        return (List<User>) userRepo.findAllWithPass().orElseThrow(()-> new IllegalStateException(""));
    }

    public User findByUsername(String username){
        return userRepo.findById(username)
                .orElseThrow(() -> new IllegalStateException("L'utilisateur avec nom d'utilisateur "+username+" n'existe pas"));
    }
    public User findByUsernameAndPassword(String username, String password){
        return (User) userRepo.findByUsernameAndPassword(username, password)
                .orElseThrow(() -> new IllegalStateException("L'utilisateur avec nom d'utilisateur "+username+" n'existe pas"));
    }

    public User findAllAdmins() {
        char adminRole= 'y';
        return (User) userRepo.findAllAdmins(adminRole).orElseThrow(() -> new IllegalStateException("Pas d'admins"));
    }

    public User addUser(User user, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);

        if (!userOptional.get().isAdmin()){
            System.out.println(userOptional.get().isAdmin());
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }else{
            user.setTaskLogList(new ArrayList<>());
            userRepo.save(user);
        }
        return user;
    }

    public void removeUser(String username, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);
        Optional<User> userOptional2 = userRepo.findById(username);

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }else{
            if (userOptional2.get().getTaskLogs().isEmpty()
                    || userOptional2.get().getTaskLogs() == null)   {
            userRepo.deleteById(username);
        }else{
            throw new IllegalStateException("L'utilisateur a des projets. Il ne peut pas être supprimé");
        }
    }
    }

    public User updateUser(User user, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);
        Optional<User> userOptional1 = userRepo.findById(user.getUsername());

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }else{
            user.setAdminRole(userOptional1.get().getAdminRole());
            user.setTaskLogList(userOptional1.get().getTaskLogs());

            userRepo.save(user);
        }
        return user;
    }



}
