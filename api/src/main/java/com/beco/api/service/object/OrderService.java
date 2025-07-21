package com.beco.api.service.object;

import com.beco.api.mapper.OrderMapper;
import com.beco.api.model.dto.DeliveryDto;
import com.beco.api.model.dto.DeliveryStatusDto;
import com.beco.api.model.dto.OrderDto;
import com.beco.api.model.dto.SharedDetailsDto;
import com.beco.api.model.entity.DeliveryStatusEnum;
import com.beco.api.model.entity.Order;
import com.beco.api.repository.OrderRepository;
import com.beco.api.service.AbstractCrudService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@CacheConfig(cacheNames = "orders")
public class OrderService extends AbstractCrudService<Order, OrderDto, OrderDto, UUID> {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final DeliveryService deliveryService;
    private final SharedDetailsService sharedDetailsService;
    private final String uploadDir = "${app.upload.dir:/app/uploads}";


    public OrderService(
            OrderRepository orderRepository,
            CacheManager cacheManager,
            OrderMapper orderMapper, DeliveryService deliveryService, SharedDetailsService sharedDetailsService
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
        this.sharedDetailsService = sharedDetailsService;
    }

    @Transactional
    public OrderDto create(OrderDto dto, MultipartFile file) {

        OrderDto savedOrderDto = super.create(dto);

        // Générer une livraison à partir de la commande créée
        DeliveryDto deliveryDto = new DeliveryDto();

        // Associer la commande à la livraison
        deliveryDto.setOrderId(savedOrderDto.getId());
        deliveryDto.setQuantity(savedOrderDto.getQuantityOrdered());
        deliveryDto.setActualDeliveryDate(savedOrderDto.getRequestedDeliveryDate());
        deliveryDto.setActualDeliveryTime(savedOrderDto.getRequestedDeliveryTime());

        // Définir le statut à "NEW"
        deliveryDto.setStatusId(createNewStatus().getId());

        // Sauvegarder la livraison via DeliveryService
        deliveryService.create(deliveryDto);

        // Étape 3 : Retourner le DTO de la commande
        return savedOrderDto;
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
        List<Order> orders = orderRepository.findByBillingCustomerId(customerId);
        return orders.stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    private DeliveryStatusDto createNewStatus() {
        DeliveryStatusDto status = new DeliveryStatusDto();

        DeliveryStatusEnum newEnum = DeliveryStatusEnum.NEW;
        
        status.setId(newEnum.getId());
        status.setStatus(newEnum.getStatus());
        return status;
    }

}