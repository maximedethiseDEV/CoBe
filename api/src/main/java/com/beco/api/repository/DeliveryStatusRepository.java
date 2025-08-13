package com.beco.api.repository;

import com.beco.api.model.entity.DeliveryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DeliveryStatusRepository extends JpaRepository<DeliveryStatus, UUID> {
}
