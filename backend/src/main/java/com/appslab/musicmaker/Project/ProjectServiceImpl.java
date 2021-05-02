package com.appslab.musicmaker.Project;

import com.appslab.musicmaker.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService{

    private ProjectRepository repository;

    private UserService userService;

    @Autowired
    public ProjectServiceImpl(ProjectRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    @Override
    public Long saveProject(Project project)
    {
        project.setUser(userService.getCurrentUser());
        repository.save(project);
        return project.getId();
    }

    @Override
    public Project findById(long id) {
        Project project = repository.findById(id).get();
        if (!project.getUser().equals(userService.getCurrentUser())) return null;
        return project;
    }

    @Override
    public List<Project> getList() {
        Iterable<Project> infos =  repository.findByuser(userService.getCurrentUser());
        List<Project> result = new ArrayList<>();
        infos.forEach(p -> {
            p.setPatternList(null);
            p.setUser(null);
            result.add(p);
        });
        return result;
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
