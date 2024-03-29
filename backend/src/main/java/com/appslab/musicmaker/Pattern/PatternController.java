package com.appslab.musicmaker.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
public class PatternController {
    @Autowired
    private PatternService patternService;
    @RequestMapping("/savePattern")
    public long savePattern(@RequestBody Pattern pattern, @RequestParam Long projectId) throws IOException {
        return patternService.savePattern(pattern, projectId);
    }

    @GetMapping("/getPattern/{id}")
    public Pattern getPattern(@PathVariable Long id) throws IOException {
        return patternService.findById(id);
    }

    @GetMapping("/getPatternsInfo")
    public Pattern[] getPatternsInfo(@RequestParam Long projectId) throws IOException {
        return patternService.getPatternsInfo(projectId).toArray(new Pattern[0]);
    }

    @DeleteMapping("/getPattern/{id}")
    void deletePattern(@PathVariable Long id) {
        patternService.deleteById(id);
    }

}
