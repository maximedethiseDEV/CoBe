package com.beco.api.repository;

import com.beco.api.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {
    List<Delivery> findByOrder(Order orderId);

    @Query("SELECT d FROM Delivery d WHERE d.status = :status")
    List<Delivery> findByStatusCustom(@Param("status") DeliveryStatus status);

}
