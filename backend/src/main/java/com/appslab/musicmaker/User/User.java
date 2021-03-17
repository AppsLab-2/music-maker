package com.appslab.musicmaker.User;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String userName;
    private String password;

    public User(String name,String password)
    {
        this.userName = name;
        this.password = password;

    }

    public String getName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }
}
