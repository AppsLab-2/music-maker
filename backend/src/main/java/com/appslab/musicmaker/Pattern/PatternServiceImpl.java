package com.appslab.musicmaker.Pattern;

import com.appslab.musicmaker.Project.ProjectService;
import com.appslab.musicmaker.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class PatternServiceImpl implements PatternService{
    @Autowired
    private PatternRepository patternRepository;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private UserService userService;

    @Override
    public long savePattern(Pattern pattern, Long projectId) throws IOException {
        pattern.setProject(projectService.findById(projectId));
        patternRepository.save(pattern);
        PrintWriter writer = new PrintWriter(new File("").getAbsolutePath() + pattern.getId() + ".txt", "UTF-8");
        writer.print(pattern.getNotes());
        writer.close();
        return pattern.getId();
    }

    @Override
    public Pattern findById(Long id) throws IOException {
        Pattern patt = patternRepository.findById(id).get();
        if (!patt.getProject().getUser().equals(userService.getCurrentUser())) return null;
        Path path =  Paths.get(new File("").getAbsolutePath() + patt.getId() + ".txt");
        patt.setNotes(Files.readString(path));
        return patt;
    }

    @Override
    public List<Pattern> getPatternsInfo(Long projectId) {
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
    }

    @Override
    public String getNotes(Pattern pattern) throws IOException {
        Path path =  Paths.get(new File("").getAbsolutePath() + pattern.getId() + ".txt");
        return Files.readString(path);
    }
}
