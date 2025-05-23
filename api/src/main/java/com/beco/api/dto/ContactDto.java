package com.beco.api.dto;

import jakarta.persistence.*;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ContactDto {

    private Integer contactId;

    @NotNull(message = " Le nom de famille est obligatoire")
    private String lastName;

    @NotNull(message = " Le prénom est obligatoire")
    private String firstName;

    @Email(message = "L'adresse e-mail doit être valide")
    private String email;

    private String phone;

    private String role;
}