package com.appslab.musicmaker.User;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    public UserController(UserService ser)
    {
        this.ser = ser;
    }

    UserService ser;

    @PostMapping("/user")
    public void saveUser(@RequestBody User user) {
        ser.saveUser(user);
    }
}
