package com.beco.api.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "shared_details")
public class SharedDetails extends AbstractEntity {

    @Column(name = "attachment_path")
    private String attachmentPath;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;
}