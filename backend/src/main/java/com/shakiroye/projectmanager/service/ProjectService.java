package com.shakiroye.projectmanager.service;

import com.shakiroye.projectmanager.model.*;
import com.shakiroye.projectmanager.model.Project;
import com.shakiroye.projectmanager.repository.ProjectRepo;
import com.shakiroye.projectmanager.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepo projectRepo;
    private final UserRepo userRepo;
    private final CompanyService companyService;
    @Autowired
    public ProjectService(ProjectRepo projectRepo, UserRepo userRepo, CompanyService companyService) {
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
        this.companyService = companyService;
    }

    public List<Project> findAllProjects(){
        return projectRepo.findAll();
    }

    public Project findProjectById(Integer projectId){
        return projectRepo.findById(projectId)
                .orElseThrow(() -> new IllegalStateException("Le projet avec l'id "+projectId+" n'existe pas"));
    }

    public Project addProject(Project project, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);
        List<Task> emptyTasks = new ArrayList<>();
        Company company = companyService.findCompanyById(project.getCompanyId());

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }else{
            project.setTasks(emptyTasks);
            project.setCompany(company);
            projectRepo.save(project);
        }
        return project;
    }

    public void removeProject(Integer projectId, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);
        Optional<Project> projectOptional = projectRepo.findById(projectId);

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }
        boolean exists = projectRepo.existsById(projectId);
        if(!exists){
            throw new IllegalStateException("Le projet avec l'id " + projectId + " n'existe pas");
        }else{
            if (projectOptional.get().getTasks().isEmpty()
                    || projectOptional.get().getTasks() == null){
                projectRepo.deleteById(projectId);
            }else{
                throw new IllegalStateException("Le projet a des taches. Elle ne peut pas être supprimée");
            }
        }

    }

    public Project updateProject(Project project, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);
        Optional<Project> projectOptional = projectRepo.findById(project.getIdProject());
        Company company = companyService.findCompanyById(project.getCompanyId());
        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }else{
            project.setCompany(company);
            project.setTasks(projectOptional.get().getTasks());
            projectRepo.save(project);
        }
        return project;
    }
}
