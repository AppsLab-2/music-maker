package com.appslab.musicmaker.Pattern;

import com.appslab.musicmaker.User.User;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@DynamicUpdate
public class Pattern {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "pattern_id")
    private long id;
    @Column(name = "patter_name")
    private String name;
    @Column(name = "pattern_notes")
    private String notes;
    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    public Pattern(){

    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getName() {
        return name;
    }

    public String getNotes() {
        return notes;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User FgetUser() {
        return user;
    }

    public long getId() {
        return id;
    }
}
