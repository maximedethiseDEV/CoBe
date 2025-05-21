package com.beco.api.controller;

import com.beco.api.model.Customer;
import com.beco.api.model.Order;
import com.beco.api.service.OrderService;
import com.beco.api.service.CrudService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController extends AbstractCrudController<Order, Integer> {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override
    protected CrudService<Order, Integer> getService() {
        return orderService;
    }


    // Récupérer les commandes par client de facturation
    @GetMapping("/byclient/{clientId}")
    public ResponseEntity<List<Order>> getOrdersByBillingCustomer(@PathVariable Integer clientId) {
        Customer billingClient = new Customer();
        billingClient.setCustomerId(clientId);
        List<Order> orders = orderService.findByBillingCustomer(billingClient);
        return ResponseEntity.ok(orders);
    }

}
