package com.cobe.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class DBUserDto extends AbstractDto {

    private String username;

    private UUID contactId;
        private String lastName;
        private String firstName;
        private String email;
        private String phone;


    private String permission;
}