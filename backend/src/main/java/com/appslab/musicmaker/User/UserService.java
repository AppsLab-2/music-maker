package com.appslab.musicmaker.User;

import com.appslab.musicmaker.UserExistsException;
import org.springframework.stereotype.Component;

@Component
public interface UserService {
    void saveUser(User user);
    Iterable<User> getUser();

    boolean nameExist(User user);
    void registerNewUserAccount(User user) throws UserExistsException;
}
