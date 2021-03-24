package com.appslab.musicmaker.User;

import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    private UserRepository rep;

    public UserServiceImpl(UserRepository rep){

        this.rep = rep;
    }

    @Override
    public void saveUser(User user) {
        rep.save(user);
    }
    @Override
    public Iterable<User> getUser()
    {
        return rep.findAll();
    }
}
