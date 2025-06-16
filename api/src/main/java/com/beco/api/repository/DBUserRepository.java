package com.beco.api.repository;

import com.beco.api.model.entity.DBUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DBUserRepository extends JpaRepository<DBUser, UUID> {
    public DBUser findByUsername(String username);
}