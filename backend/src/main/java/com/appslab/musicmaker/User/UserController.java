package com.appslab.musicmaker.User;

import com.appslab.musicmaker.UserExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    public UserController(UserService ser) {
        this.ser = ser;
    }

    UserService ser;

    @RequestMapping("/saveUser")
    public void saveUser(@RequestBody User user) throws UserExistsException {
        ser.registerNewUserAccount(user);
    }

    @GetMapping("/getUser")
    public User getUser(@RequestBody String s) {
        return userRepository.findByname(s).get();
    }

    @RequestMapping("/user")
    public User user(Principal user) {
        return new User(user.getName(), null);
    }
}