package com.shakiroye.projectmanager.repository;

import com.shakiroye.projectmanager.model.UserLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLogRepo extends JpaRepository<UserLog, Integer> {
}
