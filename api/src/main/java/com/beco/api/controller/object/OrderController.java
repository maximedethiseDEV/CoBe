package com.beco.api.controller.object;

import com.beco.api.config.sse.SseEventMessage;
import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.OrderDto;
import com.beco.api.model.entity.Order;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController extends AbstractCrudController<Order, OrderDto, OrderDto, UUID> {

    private final OrderService orderService;

    public OrderController(
            OrderService orderService,
            SseService sseService
    ) {
        super(sseService);
        this.orderService = orderService;
    }

    @PostMapping(value = "/with-file", consumes = "multipart/form-data")
    public ResponseEntity<OrderDto> createWithFile(
            @RequestPart("order") OrderDto orderDto,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        OrderDto createdOrder = orderService.create(orderDto, file);

        String entityPath = getEntityPath();
        sseService.broadcastToEntity(entityPath,
                new SseEventMessage("CREATE", entityPath, createdOrder));

        return ResponseEntity.ok(createdOrder);
    }


    @Override
    protected AbstractCrudService<Order, OrderDto, OrderDto, UUID> getService() {

        return orderService;
    }

    @GetMapping("/customers/{customerId}")
    public ResponseEntity<List<OrderDto>> getOrdersByCustomer(@PathVariable UUID customerId) {
        List<OrderDto> orders = orderService.findOrdersByCustomer(customerId);
        return ResponseEntity.ok(orders);
    }

}
