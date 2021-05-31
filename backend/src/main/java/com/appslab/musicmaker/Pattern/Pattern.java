package com.appslab.musicmaker.Pattern;

import com.appslab.musicmaker.Project.Project;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Transient
    private String notes;
    @ManyToOne
    @JoinColumn(name="project_id", nullable = false)
    @JsonIgnore
    private Project project;
    @Column(name = "scale_offset")
    private byte offset;

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

    public void setProject(Project project) {
        this.project = project;
    }

    public Project getProject() {
        return project;
    }

    public long getId() {
        return id;
    }

    public byte getOffset() {
        return offset;
    }

    public void setOffset(byte offset) {
        this.offset = offset;
    }
}
