package com.shakiroye.projectmanager.model;

import com.sun.istack.NotNull;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_task")
    private Integer idTask;
    @Basic(optional = false)
    @NotNull
    @BatchSize(size = 200)
    @Column(name = "task_name")
    private String taskName;
    @JoinColumn(name = "id_project", referencedColumnName = "id_project")
    @ManyToOne(optional = false)
    private Project project;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "task")
    private List<TaskLog> taskLogs;

    public Task() {
    }

    public Task(Integer idTask) {
        this.idTask = idTask;
    }

    public Task(Integer idTask, String taskName) {
        this.idTask = idTask;
        this.taskName = taskName;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public void setTaskLogs(List<TaskLog> taskLogs) {
        this.taskLogs = taskLogs;
    }

    public Integer getIdTask() {
        return idTask;
    }

    public void setIdTask(Integer idTask) {
        this.idTask = idTask;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Integer getProjectId() {
        return project.getIdProject();
    }

    public String getProjectName() {
        return project.getProjectName();
    }

     public ArrayList<TaskLog> getTaskLogs(){
        ArrayList<TaskLog> allTaskLogs = new ArrayList<TaskLog>();
            for (TaskLog taskLog : taskLogs){
                    allTaskLogs.add(taskLog) ;
            }
        return allTaskLogs;
    }

    @Override
    public String toString() {
        return "Task{" +
                "idTask=" + idTask +
                ", taskName='" + taskName + '\'' +
                ", project=" + project +
                ", taskLogs=" + taskLogs +
                '}';
    }
}
