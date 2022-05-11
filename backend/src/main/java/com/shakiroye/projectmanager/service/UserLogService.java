package com.shakiroye.projectmanager.service;

import com.shakiroye.projectmanager.model.User;
import com.shakiroye.projectmanager.model.UserLog;
import com.shakiroye.projectmanager.repository.UserLogRepo;
import com.shakiroye.projectmanager.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserLogService {
    private final UserLogRepo userLogRepo;
    private final UserRepo userRepo;
    @Autowired
    public UserLogService(UserLogRepo userLogRepo, UserRepo userRepo) {
        this.userLogRepo = userLogRepo;
        this.userRepo = userRepo;
    }

    public List<UserLog> getUserLogs(){
        return userLogRepo.findAll();
    }

    public UserLog findUserLogById(Integer userLogId){
        return userLogRepo.findById(userLogId)
                .orElseThrow(()->new IllegalStateException("Inexistant"));
    }

    public UserLog addUserLog(UserLog userLog, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);
        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }else{
            userLogRepo.save(userLog);
        }
        return userLog;
    }
}
