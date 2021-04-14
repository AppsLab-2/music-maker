package com.appslab.musicmaker.Project;

import com.appslab.musicmaker.User.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Set;

@Component
public interface ProjectRepository extends CrudRepository<Project, Long> {
    Set<Project> findByuser(User user);
}
