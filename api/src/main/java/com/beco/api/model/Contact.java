package com.beco.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "contact")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contact_id")
    private Integer contactId;

    @Column(name = "last_name", nullable = false)
    @NotNull(message = " Le nom de famille est obligatoire")
    private String lastName;

    @Column(name = "first_name")
    @NotNull(message = " Le prénom est obligatoire")
    private String firstName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "role")
    private String role;
}