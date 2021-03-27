package com.appslab.musicmaker;

import com.appslab.musicmaker.User.User;
import com.appslab.musicmaker.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String name) {
        User user = userRepository.findByname(name).get();
        if (userRepository.findByname(name).isEmpty()) {
            throw new UsernameNotFoundException(name);
        }
        return new MyUserDetails(user);
    }
}
