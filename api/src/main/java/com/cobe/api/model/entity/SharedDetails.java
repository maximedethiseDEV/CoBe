package com.cobe.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "shared_details")
public class SharedDetails extends AbstractEntity {

    @Column(name = "label")
    private String label;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
}