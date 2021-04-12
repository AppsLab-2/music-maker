package com.appslab.musicmaker.Pattern;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface PatternService {
    long savePattern(Pattern pattern, Long projectId);
    Pattern findById(Long id, Long projectId);
    List<Pattern> getPatternsInfo();
    void deleteById(Long id);
    void updatePattern(Pattern id);
}
