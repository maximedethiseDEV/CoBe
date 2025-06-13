package com.beco.api.repository;

import com.beco.api.model.entity.SharedDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SharedDetailsRepository extends JpaRepository<SharedDetails, Integer> {
}
