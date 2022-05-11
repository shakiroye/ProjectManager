package com.shakiroye.projectmanager.controller;

import com.shakiroye.projectmanager.model.Project;
import com.shakiroye.projectmanager.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "project-manager")
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectService projectService;
    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/project/all")
    public ResponseEntity<List<Project>> getProjects(){
        List<Project> projects = projectService.findAllProjects();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/project/find/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable("id") Integer id){
        Project project = projectService.findProjectById(id);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PostMapping("/{username}/project/add")
    public ResponseEntity<Project> addProject(@RequestBody Project project, @PathVariable("username") String username){
        Project newProject = projectService.addProject(project, username);
        return new ResponseEntity<>(newProject, HttpStatus.CREATED);
    }

    @PutMapping("/{username}/project/update")
    public ResponseEntity<Project> updateProject(@RequestBody Project project, @PathVariable("username") String username){
        Project updateProject = projectService.updateProject(project, username);
        return new ResponseEntity<>(updateProject, HttpStatus.OK);
    }

    @DeleteMapping("/{username}/project/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("username") String username,
                                            @PathVariable("id") Integer id){
        projectService.removeProject(id, username);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
