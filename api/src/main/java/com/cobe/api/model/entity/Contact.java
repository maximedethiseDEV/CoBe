package com.cobe.api.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "contact")
public class Contact extends AbstractEntity {

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name", nullable = false)
    @NotNull(message = " Le prénom est obligatoire")
    private String firstName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email", unique = true)
    @Email(message = "L'adresse e-mail doit être valide")
    private String email;

    @Column(name = "role")
    private String role;
}