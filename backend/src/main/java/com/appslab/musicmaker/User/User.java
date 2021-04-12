package com.appslab.musicmaker.User;

import com.appslab.musicmaker.Project.Project;

import javax.persistence.*;
import java.util.Set;

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
    @Column(name = "user_projects")
    @OneToMany(mappedBy="user")
    private Set<Project>projectSet;

    public Set<Project> getProjectSet() {
        return projectSet;
    }

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
