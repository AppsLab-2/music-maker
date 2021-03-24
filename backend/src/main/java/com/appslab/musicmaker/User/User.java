package com.appslab.musicmaker.User;

import javax.persistence.*;

@Entity
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private long id;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_password")
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
