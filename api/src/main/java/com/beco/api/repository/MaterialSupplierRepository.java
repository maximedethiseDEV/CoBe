package com.beco.api.repository;

import com.beco.api.model.entity.MaterialSupplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialSupplierRepository extends JpaRepository<MaterialSupplier, Integer> {
}
