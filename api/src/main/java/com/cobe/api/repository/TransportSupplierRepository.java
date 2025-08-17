package com.cobe.api.repository;

import com.cobe.api.model.entity.TransportSupplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TransportSupplierRepository extends JpaRepository<TransportSupplier, UUID> {
}
