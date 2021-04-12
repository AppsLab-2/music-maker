package com.appslab.musicmaker.Project;

import org.springframework.stereotype.Component;

@Component
public interface ProjectService {
    void saveProject(Project project);
    Project findById(long id);
}
