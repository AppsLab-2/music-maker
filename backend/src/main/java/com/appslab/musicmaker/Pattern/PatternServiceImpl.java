package com.appslab.musicmaker.Pattern;

import com.appslab.musicmaker.Project.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatternServiceImpl implements PatternService{
    @Autowired
    private PatternRepository patternRepository;
    @Autowired
    private ProjectService projectService;

    @Override
    public long savePattern(Pattern pattern, Long projectId) {
        System.out.println(pattern.getId());
        pattern.setProject(projectService.findById(projectId));
        patternRepository.save(pattern);
        return pattern.getId();
    }


    @Override
    public Pattern findById(Long id,Long projectId) {
        Pattern patt = patternRepository.findById(id).get();
        if (!patt.getProject().equals(projectService.findById(projectId))) return null;
        return patt;
    }

    @Override
    public List<Pattern> getPatternsInfo() {
        Iterable<Pattern> infos =  patternRepository.findByuser(userService.getCurrentUser());
        List<Pattern> result = new ArrayList<>();
        infos.forEach(p -> {
            p.setNotes(null);
            result.add(p);
        });
        return result;

    }

    @Override
    public void deleteById(Long id) {
        patternRepository.deleteById(id);
    }

    @Override
    public void updatePattern(Pattern pattern) {

    }
}
