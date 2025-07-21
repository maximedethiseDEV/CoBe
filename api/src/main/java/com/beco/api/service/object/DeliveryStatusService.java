package com.beco.api.service.object;

import com.beco.api.model.entity.DeliveryStatus;
import com.beco.api.model.entity.DeliveryStatusEnum;
import com.beco.api.repository.DeliveryStatusRepository;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeliveryStatusService {

    private final DeliveryStatusRepository deliveryStatusRepository;

    public DeliveryStatusService(DeliveryStatusRepository deliveryStatusRepository) {
        this.deliveryStatusRepository = deliveryStatusRepository;
    }

    @PostConstruct
    public void validateDeliveryStatus() {
        // Récupérer les statuts en base
        List<String> dbStatuses = deliveryStatusRepository.findAll().stream()
                .map(DeliveryStatus::getStatus)
                .collect(Collectors.toList());

        // Vérifier que tous les statuts de l'Enum existent en base
        for (DeliveryStatusEnum statusEnum : DeliveryStatusEnum.values()) {
            if (!dbStatuses.contains(statusEnum.getStatus())) {
                // Si un statut Enum manque, le créer automatiquement
                DeliveryStatus status = new DeliveryStatus();
                status.fromEnum(statusEnum);
                deliveryStatusRepository.save(status);
            }
        }
    }
}