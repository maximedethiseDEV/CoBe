package com.beco.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "shared_details")
public class SharedDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shared_details_id")
    private Integer sharedDetailsId;

    @Column(name = "attachment_path")
    private String attachmentPath;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
}