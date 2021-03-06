package com.appslab.musicmaker.User;

import org.springframework.stereotype.Component;

@Component
public interface UserService {
    void saveUser(User user);
}
