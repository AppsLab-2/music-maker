package com.appslab.musicmaker.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface UserRepository extends CrudRepository<User,String>{
    Optional<User> findByname(String name);
}
