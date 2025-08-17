package com.cobe.api.repository;

import com.cobe.api.model.entity.DeliveryOrderNumber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DeliveryOrderNumberRepository extends JpaRepository<DeliveryOrderNumber, UUID> {
}
