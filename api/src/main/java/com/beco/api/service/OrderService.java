package com.beco.api.service;

import com.beco.api.model.Customer;
import com.beco.api.model.Order;
import com.beco.api.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements CrudService<Order, Integer>{

    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public List<Order> findAll() {
        return repository.findAll();
    }

    public Order findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Commande n°" + id + " non trouvée"));
    }

    public Order save(Order order) {
        return repository.save(order);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    // Récupérer les commandes par client de facturation
    public List<Order> findByBillingCustomer(Customer billingClient) {
        return repository.findByBillingCustomer(billingClient);
    }
}
