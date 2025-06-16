package com.beco.api.service.object;

import com.beco.api.mapper.OrderMapper;
import com.beco.api.model.dto.DeliveryDto;
import com.beco.api.model.dto.DeliveryStatusDto;
import com.beco.api.model.dto.OrderDto;
import com.beco.api.model.entity.DeliveryStatusEnum;
import com.beco.api.model.entity.Order;
import com.beco.api.repository.OrderRepository;
import com.beco.api.service.AbstractCrudService;
import jakarta.transaction.Transactional;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@CacheConfig(cacheNames = "orders")
public class OrderService extends AbstractCrudService<Order, OrderDto, OrderDto, UUID> {

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

    @Override
    @Cacheable(key = "'all'")
    public List<OrderDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public OrderDto findById(UUID id) {
        return super.findById(id);
    }

    @Override
    @Transactional
    @CachePut(key = "#result.orderId")
    public OrderDto create(OrderDto dto) {
        // Étape 1 : Créer la commande en utilisant la logique existante
        OrderDto savedOrderDto = super.create(dto);

        // Étape 2 : Générer une livraison à partir de la commande créée
        DeliveryDto deliveryDto = new DeliveryDto();

        deliveryDto.setOrder(savedOrderDto); // Associer la commande à la livraison
        deliveryDto.setQuantity(savedOrderDto.getQuantityOrdered());
        deliveryDto.setActualDeliveryDate(savedOrderDto.getRequestedDeliveryDate());
        deliveryDto.setActualDeliveryTime(savedOrderDto.getRequestedDeliveryTime());

        // Créer le statut à "NEW" et l'affecter à la livraison
        deliveryDto.setStatus(createNewStatus());


        // Sauvegarder la livraison via DeliveryService
        deliveryService.create(deliveryDto);

        // Étape 3 : Retourner le DTO de la commande
        return savedOrderDto;
    }

    @Override
    @CachePut(key = "#id")
    public OrderDto update(UUID id, OrderDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(UUID id) {
        super.deleteById(id);
    }

    @Override
    protected boolean dataValidatorControl(OrderDto dto) {
        Boolean isValid = true;



        return isValid;
    }

    @Override
    protected String getEntityName() {
        return "order";
    }

    public List<OrderDto> findOrdersByCustomer(UUID customerId) {
        List<Order> orders = orderRepository.findByBillingCustomerCustomerId(customerId);
        return orders.stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    private DeliveryStatusDto createNewStatus() {
        DeliveryStatusDto status = new DeliveryStatusDto();

        DeliveryStatusEnum newEnum = DeliveryStatusEnum.NEW;
        
        status.setStatusId(newEnum.getId());
        status.setStatus(newEnum.getStatus());
        return status;
    }

}