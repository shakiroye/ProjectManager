package com.shakiroye.projectmanager.model;

import com.sun.istack.NotNull;
import org.hibernate.annotations.BatchSize;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class User {
    @Id
    @NotNull
    @Column(name = "username", nullable = false, length = 10)
    private String username;
    @Basic(optional = false)
    @NotNull
    @BatchSize(size = 100)
    @Column(name = "first_name")
    private String firstName;
    @Basic(optional = false)
    @NotNull
    @BatchSize(size = 100)
    @Column(name = "last_name")
    private String lastName;
    @Basic(optional = false)
    @NotNull
    @BatchSize(size = 100)
    @Column(name = "email")
    private String email;
    @Basic(optional = false)
    @NotNull
    @BatchSize(size = 100)
    @Column(name = "password")
    private String password;
    @Basic(optional = false)
    @NotNull
    @Column(name = "admin_role")
    private Character adminRole;
    @Nullable
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<TaskLog> taskLogList;

    public User() {
    }

    public User(String username, String firstName, String lastName, String email, String password, Character adminRole) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.adminRole = adminRole;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Character getAdminRole() {
        return adminRole;
    }

    public void setAdminRole(Character adminRole) {
        this.adminRole = adminRole;
    }

    @org.springframework.data.relational.core.mapping.Embedded.Nullable
    public ArrayList<TaskLog> getTaskLogs(){
        ArrayList<TaskLog> allTaskLogs = new ArrayList<TaskLog>();
        for (TaskLog taskLog : taskLogList){
            allTaskLogs.add(taskLog) ;
        }
        return allTaskLogs;
    }

    public void setTaskLogList(List<TaskLog> taskLogList) {
        this.taskLogList = taskLogList;
    }

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", adminRole=" + adminRole +
                ", taskLogList=" + taskLogList +
                '}';
    }

    public boolean isAdmin() {
        return adminRole == null ? false : adminRole.equals('Y');
    }
}
