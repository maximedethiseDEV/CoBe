package com.cobe.api.repository;

import com.cobe.api.model.entity.SharedDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SharedDetailsRepository extends JpaRepository<SharedDetails, UUID> {
}
