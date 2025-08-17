package com.cobe.api.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ContactDto extends AbstractDto {

    @NotNull(message = " Le nom de famille est obligatoire")
    private String lastName;

    @NotNull(message = " Le prénom est obligatoire")
    private String firstName;

    @Email(message = "L'adresse e-mail doit être valide")
    private String email;

    private String phone;

    private String role;
}