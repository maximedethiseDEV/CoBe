package com.beco.api.controller;

import com.beco.api.model.Customer;
import com.beco.api.dto.OrderDto;
import com.beco.api.service.dto.OrderDtoService;
import com.beco.api.service.CrudService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController extends AbstractCrudController<OrderDto, Integer> {

    private final OrderDtoService orderDtoService;

    public OrderController(OrderDtoService orderDtoService) {
        this.orderDtoService = orderDtoService;
    }

    @Override
    protected CrudService<OrderDto, Integer> getService() {
        return orderDtoService;
    }

    //TODO Refactoriser pour déplacer la logique métier dans le service
    // Récupérer les commandes par client de facturation
    @GetMapping("/customers/{clientId}")
    public ResponseEntity<List<OrderDto>> getOrdersByBillingCustomer(@PathVariable Integer clientId) {
        Customer billingClient = new Customer();
        billingClient.setCustomerId(clientId);
        List<OrderDto> orders = orderDtoService.findByBillingCustomer(billingClient);
        return ResponseEntity.ok(orders);
    }

}
