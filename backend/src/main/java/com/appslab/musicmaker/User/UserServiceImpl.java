package com.appslab.musicmaker.User;

import com.appslab.musicmaker.UserExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository rep){
        this.userRepository = rep;
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }
    @Override
    public Iterable<User> getUser()
    {
        return userRepository.findAll();
    }

    @Override
    public boolean nameExist(User user){
        return userRepository.findByname(user.getName()).isPresent();
    }

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public void registerNewUserAccount(User user) throws UserExistsException {
        if (nameExist(user)) throw new UserExistsException("User with name: " + user.getName() + " already exists");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public User getCurrentUser() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByname(name).get();
    }
}
