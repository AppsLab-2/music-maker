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
    private String name;
    @Column(name = "user_password")
    private String password;

    public User(String name, String password)
    {
        this.name = name;
        this.password = password;
    }

    public User(){

    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
