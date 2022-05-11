package com.shakiroye.projectmanager.model;

import com.sun.istack.NotNull;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_project")
    private Integer idProject;
    @Basic(optional = false)
    @NotNull
    @Column(name = "project_name")
    private String projectName;
    @JoinColumn(name = "id_company", referencedColumnName = "id_company")
    @ManyToOne(optional = false)
    private Company company;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "project")
    private List<Task> tasks;

    public Project() {
    }

    public Project(Integer idProject, String projectName) {
        this.idProject = idProject;
        this.projectName = projectName;
    }

    public Integer getIdProject() {
        return idProject;
    }

    public void setIdProject(Integer idProject) {
        this.idProject = idProject;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

//    public Company getCompany() {
//        return company;
//    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Integer getCompanyId() {
        return company.getIdCompany();
    }

    public void setCompanyName(String companyName) {
        this.company.setCompanyName(companyName);
    }

    public ArrayList<Task> getTasks(){
        ArrayList<Task> allTasks = new ArrayList<>();
        for (Task task : tasks){
            allTasks.add(task) ;
        }
        return allTasks;
    }



    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "Project{" +
                "idProject=" + idProject +
                ", projectName='" + projectName + '\'' +
                '}';
    }
}
