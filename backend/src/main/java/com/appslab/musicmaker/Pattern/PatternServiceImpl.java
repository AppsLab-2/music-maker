package com.appslab.musicmaker.Pattern;

import com.appslab.musicmaker.Project.ProjectService;
import com.appslab.musicmaker.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class PatternServiceImpl implements PatternService{

    private PatternRepository patternRepository;

    private ProjectService projectService;

    private UserService userService;

    @Autowired
    public PatternServiceImpl(PatternRepository patternRepository, ProjectService projectService, UserService userService) {
        this.patternRepository = patternRepository;
        this.projectService = projectService;
        this.userService = userService;
    }

    @Override
    public long savePattern(Pattern pattern, Long projectId) throws IOException {
        pattern.setProject(projectService.findById(projectId));
        patternRepository.save(pattern);
        File theDir = new File("notes");
        if (!theDir.exists()) theDir.mkdirs();
        PrintWriter writer = new PrintWriter(new File(String.format("notes/%d.json", pattern.getId())));
        writer.print(pattern.getNotes());
        writer.close();
        return pattern.getId();
    }

    @Override
    public Pattern findById(Long id) throws IOException {
        Pattern patt = patternRepository.findById(id).orElseThrow();
        if (!patt.getProject().getUser().equals(userService.getCurrentUser())) return null;
        patt.setNotes(getNotes(patt));
        patt.setProject(null);
        return patt;
    }

    @Override
    public List<Pattern> getPatternsInfo(Long projectId) throws IOException {
        Iterable<Pattern> infos =  patternRepository.findByproject(projectService.findById(projectId));
        List<Pattern> result = new ArrayList<>();
        infos.forEach(p -> {
            p.setNotes(null);
            p.setProject(null);
            result.add(p);
        });
        return result;

    }

    @Override
    public void deleteById(Long id) {
        patternRepository.deleteById(id);
        new File(String.format("notes/%d.json", id)).delete();
    }

    @Override
    public String getNotes(Pattern pattern) throws IOException {
        Path path =  Paths.get(String.format("notes/%d.json", pattern.getId()));
        return Files.readString(path);
    }
}
