package com.appslab.musicmaker.Pattern;

import com.appslab.musicmaker.User.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;


@Component
public interface PatternRepository extends CrudRepository<Pattern, Long> {
    Iterable<Pattern> findByuser(User user);
}
