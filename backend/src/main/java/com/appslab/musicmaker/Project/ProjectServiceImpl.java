package com.appslab.musicmaker.Project;

import com.appslab.musicmaker.Pattern.PatternService;
import com.appslab.musicmaker.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService{

    private ProjectRepository repository;

    private UserService userService;

    private PatternService patternService;


    @Autowired
    public ProjectServiceImpl(ProjectRepository repository, UserService userService,PatternService patternService) {
        this.repository = repository;
        this.userService = userService;
        this.patternService = patternService;
    }

    @Override
    public Long saveProject(Project project) throws FileNotFoundException {
        project.setUser(userService.getCurrentUser());
        savePatterns(project);
        repository.save(project);
        return project.getId();
    }

    @Override
    public Project findById(long id) throws IOException {
        Project project = repository.findById(id).get();
        if (!project.getUser().equals(userService.getCurrentUser())) return null;
        project.setPatterns(getPatterns(project));
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
    public void deleteById(Long id) throws IOException {
        findById(id).getPatternList().forEach(pattern -> patternService.deleteById(pattern.getId()));
        repository.deleteById(id);

        new File(String.format("patterns/%d.json", id)).delete();
    }

    @Override
    public void savePatterns(Project project) throws FileNotFoundException {
        File theDir = new File("patterns");
        if (!theDir.exists()) theDir.mkdirs();
        PrintWriter writer = new PrintWriter(new File(String.format("patterns/%d.json", project.getId())));
        writer.print(project.getPatterns());
        writer.close();
    }

    @Override
    public String getPatterns(Project project) throws IOException {
        Path path =  Paths.get(String.format("patterns/%d.json", project.getId()));
        return Files.readString(path);
    }
}
