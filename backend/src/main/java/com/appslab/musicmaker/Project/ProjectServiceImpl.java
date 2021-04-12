package com.appslab.musicmaker.Project;

import com.appslab.musicmaker.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl implements ProjectService{
    @Autowired
    private ProjectRepository repository;
    @Autowired
    private UserService userService;
    @Override
    public void saveProject(Project project)
    {
        repository.save(project);
    }

    @Override
    public Project findById(long id) {
        Project project = repository.findById(id).get();
        if (!project.getUser().equals(userService.getCurrentUser())) return null;
        return project;
    }

}
