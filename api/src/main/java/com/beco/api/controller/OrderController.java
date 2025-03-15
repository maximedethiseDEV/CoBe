package com.beco.api.controller;

import com.beco.api.model.Client;
import com.beco.api.model.Order;
import com.beco.api.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Récupérer toutes les commandes
    @GetMapping("orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.findAll();
        return ResponseEntity.ok(orders);
    }

    // Récupérer une commande par ID
    @GetMapping("/order/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Créer ou mettre à jour une commande
    @PostMapping("/order")
    public ResponseEntity<Order> createOrUpdateOrder(@RequestBody Order order) {
        Order savedOrder = orderService.saveOrder(order);
        return ResponseEntity.ok(savedOrder);
    }

    // Supprimer une commande par ID
    @DeleteMapping("/order/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrderById(id);
        return ResponseEntity.noContent().build();
    }

    // Récupérer les commandes par client de facturation
    @GetMapping("/orderedbyclient/{clientId}")
    public ResponseEntity<List<Order>> getOrdersByBillingClient(@PathVariable Long clientId) {
        Client client = new Client();
        client.setClientId(clientId);
        List<Order> orders = orderService.findByBillingClient(client);
        return ResponseEntity.ok(orders);
    }
}
