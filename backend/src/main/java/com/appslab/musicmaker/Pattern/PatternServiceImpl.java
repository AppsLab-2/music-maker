package com.appslab.musicmaker.Pattern;

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
    private UserService userService;

    @Override
    public long savePattern(Pattern pattern) {
        System.out.println(pattern.getId());
        pattern.setUser(userService.getCurrentUser());
        patternRepository.save(pattern);
        return pattern.getId();
    }

    @Override
    public Pattern findById(Long id) {
        Pattern patt = patternRepository.findById(id).get();
        if (!patt.FgetUser().equals(userService.getCurrentUser())) return null;
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
