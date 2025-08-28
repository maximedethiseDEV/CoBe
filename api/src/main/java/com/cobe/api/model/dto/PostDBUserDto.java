package com.cobe.api.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PostDBUserDto extends AbstractDto {

    private String username;

    private String password;

    private UUID contactId;

    private String permission;
}