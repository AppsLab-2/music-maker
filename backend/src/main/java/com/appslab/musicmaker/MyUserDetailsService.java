package com.appslab.musicmaker;

import com.appslab.musicmaker.User.User;
import com.appslab.musicmaker.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUserName(name);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + name));
        return  user.map(MyUserDetails::new).get();
    }
}
