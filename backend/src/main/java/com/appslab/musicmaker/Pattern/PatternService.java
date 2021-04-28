package com.appslab.musicmaker.Pattern;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public interface PatternService {
    long savePattern(Pattern pattern, Long projectId) throws IOException;
    Pattern findById(Long id) throws IOException;
    List<Pattern> getPatternsInfo(Long projectId);
    void deleteById(Long id);
    String getNotes(Pattern pattern) throws IOException;
}
