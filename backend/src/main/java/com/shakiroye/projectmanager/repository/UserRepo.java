package com.shakiroye.projectmanager.repository;

import com.shakiroye.projectmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, String> {

    @Query("SELECT u FROM User u WHERE u.username =?1 AND u.password =?2")
    Optional<Object> findByUsernameAndPassword(String username, String password);

    @Query("SELECT u FROM User u WHERE u.adminRole=?1")
    Optional<Object> findAllAdmins(char adminRole);

    @Query("SELECT u.username, u.password FROM User u")
    Optional<Object> findAllWithPass();
}
