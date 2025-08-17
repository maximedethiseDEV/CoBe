package com.cobe.api.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "contact")
public class Contact extends AbstractEntity {

    @Column(name = "last_name", nullable = false)
    @NotNull(message = " Le nom de famille est obligatoire")
    private String lastName;

    @Column(name = "first_name")
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