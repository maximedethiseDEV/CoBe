package com.beco.api.repository;

import com.beco.api.model.entity.Delivery;
import com.beco.api.model.entity.DeliveryStatus;
import com.beco.api.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, UUID> {
    List<Delivery> findByOrder(Order orderId);

    @Query("SELECT d FROM Delivery d WHERE d.status = :status")
    List<Delivery> findByStatusCustom(@Param("status") DeliveryStatus status);

}
