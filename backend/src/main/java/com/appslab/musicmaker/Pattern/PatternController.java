package com.appslab.musicmaker.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
public class PatternController {
    @Autowired
    private PatternService patternService;

    @RequestMapping("/savePattern")
    public long savePattern(@RequestBody Pattern pattern) {
        return patternService.savePattern(pattern);
    }

    @GetMapping("/getPattern/{id}")
    public Pattern getPattern(@PathVariable Long id) {
        return patternService.findById(id);
    }

    @GetMapping("/getPatternsInfo")
    public Pattern[] getPatternsInfo() {
        return patternService.getPatternsInfo().toArray(new Pattern[0]);
    }

    @DeleteMapping("/getPattern/{id}")
    void deleteEmployee(@PathVariable Long id) {
        patternService.deleteById(id);
    }

    @PostMapping("/updatePattern/{id}")
    void updateEmployee(@RequestBody Pattern pattern) {
        patternService.updatePattern(pattern);
    }
}
