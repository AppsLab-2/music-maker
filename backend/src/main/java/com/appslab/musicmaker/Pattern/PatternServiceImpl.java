package com.appslab.musicmaker.Pattern;

import com.appslab.musicmaker.Project.ProjectService;
import com.appslab.musicmaker.User.UserService;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public long savePattern(Pattern pattern, Long projectId) {
        pattern.setProject(projectService.findById(projectId));
        patternRepository.save(pattern);
        return pattern.getId();
    }


    @Override
    public Pattern findById(Long id) {
        Pattern patt = patternRepository.findById(id).get();
        if (!patt.getProject().getUser().equals(userService.getCurrentUser())) return null;
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
}
