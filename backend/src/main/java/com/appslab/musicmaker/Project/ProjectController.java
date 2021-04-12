package com.appslab.musicmaker.Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class ProjectController {
    @Autowired
    ProjectServiceImpl impl;
    @Autowired
    ProjectRepository rep;
    @RequestMapping("/newProject")
    private void saveProject(@RequestBody Project project)
    {
        impl.saveProject(project);
    }
    @GetMapping("/getProject")
    private Optional<Project> getProject(String s)
    {
        return rep.findByName(s);
    }
}
