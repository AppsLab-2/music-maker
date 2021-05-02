package com.appslab.musicmaker.Project;

import com.appslab.musicmaker.Pattern.Pattern;
import com.appslab.musicmaker.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class ProjectController {
    @Autowired
    ProjectService projectService;
    @Autowired
    UserService userService;

    @PostMapping("/saveProject")
    private long saveProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    @GetMapping("/getProject/{id}")
    public Project getProject(@PathVariable Long id) {
        return projectService.findById(id);
    }

    @GetMapping("/getList")
    public Project[] getPatternsInfo() {
        return projectService.getList().toArray(new Project[0]);
    }

    @DeleteMapping("/getProject/{id}")
    void deletePattern(@PathVariable Long id) {
        projectService.deleteById(id);
    }
}
