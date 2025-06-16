package com.beco.api.repository;

import com.beco.api.model.entity.ConstructionSite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ConstructionSiteRepository extends JpaRepository<ConstructionSite, UUID> {
}
