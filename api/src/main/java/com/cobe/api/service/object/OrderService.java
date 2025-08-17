package com.cobe.api.service.object;

import com.cobe.api.mapper.OrderMapper;
import com.cobe.api.model.dto.*;
import com.cobe.api.model.dto.OrderDto;
import com.cobe.api.model.dto.PostOrderDto;
import com.cobe.api.model.entity.Order;
import com.cobe.api.repository.OrderRepository;
import com.cobe.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@CacheConfig(cacheNames = "orders")
public class OrderService extends AbstractCrudService<Order, OrderDto, PostOrderDto, UUID> {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final DeliveryService deliveryService;

    public OrderService(
            OrderRepository orderRepository,
            CacheManager cacheManager,
            OrderMapper orderMapper, DeliveryService deliveryService
    ) {
        super(
                orderRepository,
                cacheManager,
                orderMapper::toDto,
                orderMapper::toEntity,
                orderMapper::updateOrderFromDto

        );
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.deliveryService = deliveryService;
    }

    // TODO Refactoring
    /*
    @Transactional
    public OrderDto create(PostOrderDto dto, MultipartFile file) {

        PostOrderDto savedOrderDto = super.create(dto);

        // Générer une livraison à partir de la commande créée
        PostDeliveryDto deliveryDto = new PostDeliveryDto();

        // Associer la commande à la livraison
        deliveryDto.setOrderId(savedOrderDto.getId());
        deliveryDto.setQuantity(savedOrderDto.getQuantityOrdered());
        deliveryDto.setActualDeliveryBegin(savedOrderDto.getRequestedDeliveryBegin());
        deliveryDto.setActualDeliveryEnd(savedOrderDto.getRequestedDeliveryEnd());

        // Définir le statut à "NEW"
        deliveryDto.setStatusId(createNewStatus().getId());

        // Sauvegarder la livraison via DeliveryService
        deliveryService.create(deliveryDto);

        // Étape 3 : Retourner le DTO de la commande
        return savedOrderDto;
    }

     */

    @Override
    protected boolean dataValidatorControl(PostOrderDto dto) {
        Boolean isValid = true;



        return isValid;
    }

    @Override
    protected String getEntityName() {
        return "order";
    }

    public List<OrderDto> findOrdersByCustomer(UUID customerId) {
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        return orders.stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }
}