package com.beco.api.repository;

import com.beco.api.model.Customer;
import com.beco.api.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByBillingCustomer(Customer billingClient);
}
