package com.appslab.musicmaker.Project;

import com.appslab.musicmaker.Pattern.Pattern;
import com.appslab.musicmaker.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Project
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "project_id")
    private long id;
    @Column(name = "project_name")
    private String name;
    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    @JsonIgnore
    private User user;
    @Column(name = "project_patterns")
    @OneToMany(mappedBy = "project")
    private Set<Pattern> patternList;
    @Transient
    private String patterns;

    public String getPatterns() {
        return patterns;
    }
    public void setPatterns(String patterns) {
        this.patterns = patterns;
    }
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
    public void setPatternList(Set<Pattern> patternList) {
    this.patternList = patternList;
}


    public long getId() {
        return id;
    }

    public Project(String name)
    {
        this.name = name;
    }

    public Project() {

    }

}
