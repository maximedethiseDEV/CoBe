package com.cobe.api.controller.object;

import com.cobe.api.config.sse.SseService;
import com.cobe.api.controller.AbstractCrudController;
import com.cobe.api.model.dto.OrderDto;
import com.cobe.api.model.dto.PostOrderDto;
import com.cobe.api.model.entity.Order;
import com.cobe.api.service.AbstractCrudService;
import com.cobe.api.service.object.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/purchase-orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController extends AbstractCrudController<Order, OrderDto, PostOrderDto, UUID> {

    private final OrderService orderService;

    public OrderController(
            OrderService orderService,
            SseService sseService
    ) {
        super(sseService);
        this.orderService = orderService;
    }

    @Override
    protected AbstractCrudService<Order, OrderDto, PostOrderDto, UUID> getService() {

        return orderService;
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<List<OrderDto>> getOrdersByCustomer(@PathVariable UUID id) {
        List<OrderDto> orders = orderService.findOrdersByCustomer(id);
        return ResponseEntity.ok(orders);
    }

}
