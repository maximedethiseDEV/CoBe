package com.beco.api.repository;

import com.beco.api.model.entity.Company;
import com.beco.api.model.entity.TransportSupplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransportSupplierRepository extends JpaRepository<TransportSupplier, Integer> {
}
