package com.appslab.musicmaker.Project;

import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@Component
public interface ProjectService {
    Long saveProject(Project project) throws FileNotFoundException;
    Project findById(long id) throws IOException;
    List<Project> getList();
    void deleteById(Long id) throws IOException;
    void savePatterns(Project project) throws FileNotFoundException;
    String getPatterns(Project project) throws IOException;
}
