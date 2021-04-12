package com.appslab.musicmaker.Project;

import com.appslab.musicmaker.Pattern.Pattern;
import com.appslab.musicmaker.User.User;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Project
{

    public Project(String name)
    {
        this.name = name;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "project_id")
    private long id;
    @Column(name = "project_name")
    private String name;
    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;
    @Column(name = "project_patterns")
    @OneToMany
    private Set<Pattern> patternList;


    public String getName() {
        return name;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user){
        this.user = user;
    }

    public Set<Pattern> getPatternList() {
        return patternList;
    }

    public long getId() {
        return id;
    }
}