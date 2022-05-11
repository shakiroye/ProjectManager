package com.shakiroye.projectmanager.model;

import com.sun.istack.NotNull;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
public class TaskLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_task_log")
    private Integer idTaskLog;
    @Column(name = "task_description", length = 2000)
    private String taskDescription;
    @Basic(optional = false)
    @Column(name = "task_log_date")
    @Temporal(TemporalType.DATE)
    private Date taskLogDate;
    @Basic(optional = false)
    @Column(name = "task_minutes")
    private int taskMinutes;
    @JoinColumn(name = "id_task", referencedColumnName = "id_task")
    @ManyToOne(optional = false)
    private Task task;
    @JoinColumn(name = "username", referencedColumnName = "username")
    @ManyToOne(optional = false)
    private User user;

    public TaskLog() {
    }

    public TaskLog(Integer idTaskLog, String taskDescription, Date taskLogDate, int taskMinutes) {
        this.idTaskLog = idTaskLog;
        this.taskDescription = taskDescription;
        this.taskLogDate = taskLogDate;
        this.taskMinutes = taskMinutes;
    }

    public Integer getIdTaskLog() {
        return idTaskLog;
    }

    public void setIdTaskLog(Integer idTaskLog) {
        this.idTaskLog = idTaskLog;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public Date getTaskLogDate() {
        return taskLogDate;
    }

    public void setTaskLogDate(Date taskLogDate) {
        this.taskLogDate = taskLogDate;
    }

    public int getTaskMinutes() {
        return taskMinutes;
    }

    public void setTaskMinutes(int taskMinutes) {
        this.taskMinutes = taskMinutes;
    }

    public Integer getTaskId() {
        return task.getIdTask();
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public String getUsername() {
        return user.getUsername();
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "TaskLog{" +
                "idTaskLog=" + idTaskLog +
                ", taskDescription='" + taskDescription + '\'' +
                ", taskLogDate=" + taskLogDate +
                ", taskMinutes=" + taskMinutes +
                ", task=" + task +
                ", user=" + user +
                '}';
    }

}
