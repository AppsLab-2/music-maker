package com.appslab.musicmaker.Pattern;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface PatternService {
    long savePattern(Pattern pattern);
    Pattern findById(Long id);
    List<Pattern> getPatternsInfo();
    void deleteById(Long id);
    void updatePattern(Pattern id);
}
