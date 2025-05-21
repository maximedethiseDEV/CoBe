package com.beco.api.service;

import com.beco.api.model.Delivery;
import com.beco.api.model.DeliveryStatus;
import com.beco.api.repository.DeliveryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    public DeliveryService(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    // Récupérer toutes les commandes
    public List<Delivery> getAllDeliverys() {
        return deliveryRepository.findAll();
    }

    // Récupérer une commande par ID
    public Delivery getDeliveryById(Integer id) {
        return deliveryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Commande n°" + id + " non trouvée"));
    }

    // Créer ou mettre à jour une commande
    public Delivery saveDelivery(Delivery delivery) {
        return deliveryRepository.save(delivery);
    }

    // Supprimer une commande par ID
    public void deleteDeliveryById(Integer id) {
        deliveryRepository.deleteById(id);
    }

    public List<Delivery> findByStatus(DeliveryStatus status) {
        return deliveryRepository.findByStatusCustom(status);
    }
}
