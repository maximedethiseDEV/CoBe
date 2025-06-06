package com.beco.api.controller.object;

import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.PostOrderDto;
import com.beco.api.model.dto.GetOrderDto;
import com.beco.api.model.entity.Customer;
import com.beco.api.model.entity.Order;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.OrderDtoService;
import com.beco.api.config.sse.SseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController extends AbstractCrudController<Order, GetOrderDto, PostOrderDto, Integer> {

    private final OrderDtoService orderDtoService;

    public OrderController(
            OrderDtoService orderDtoService,
            SseService sseService
    ) {
        super(sseService);
        this.orderDtoService = orderDtoService;
    }

    @Override
    protected AbstractCrudService<Order, GetOrderDto, PostOrderDto, Integer> getService() {
        return orderDtoService;
    }

    /**
     * Récupère toutes les commandes d'un client donné par son ID.
     */
    @GetMapping("/customers/{clientId}")
    public ResponseEntity<List<GetOrderDto>> getOrdersByBillingCustomer(@PathVariable Integer clientId) {
        Customer billingClient = new Customer();
        billingClient.setCustomerId(clientId);
        List<GetOrderDto> orders = orderDtoService.findByBillingCustomer(billingClient);
        return ResponseEntity.ok(orders);
    }
}
