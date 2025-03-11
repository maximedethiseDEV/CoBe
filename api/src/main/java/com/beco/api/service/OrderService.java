package com.beco.api.service;

import com.beco.api.model.Client;
import com.beco.api.model.Order;
import com.beco.api.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Récupérer toutes les commandes
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    // Récupérer une commande par ID
    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

    // Créer ou mettre à jour une commande
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    // Supprimer une commande par ID
    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }

    // Récupérer les commandes par client de facturation
    public List<Order> findByBillingClient(Client billingClient) {
        return orderRepository.findByBillingClient(billingClient);
    }
}
