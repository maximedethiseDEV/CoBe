package com.cobe.api.repository;

import com.cobe.api.model.entity.DBUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DBUserRepository extends JpaRepository<DBUser, UUID> {
    public DBUser findByUsername(String username);
}