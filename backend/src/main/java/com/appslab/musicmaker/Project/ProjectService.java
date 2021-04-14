package com.appslab.musicmaker.Project;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ProjectService {
    void saveProject(Project project);
    Project findById(long id);
    List<Project> getList();
}
