package com.beco.api.model;

import lombok.Data;

@Data
public class JWTResponse {
    private String token;

    public JWTResponse(String token) {
        this.token = token;
    }
}
