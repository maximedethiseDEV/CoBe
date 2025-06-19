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
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
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

    @Value("${app.upload.dir:/app/uploads}")
    private String uploadDir;


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

    @Transactional
    @CachePut(key = "#result.orderId")
    public OrderDto create(OrderDto dto, MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            try {
                String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path uploadPath = Paths.get(uploadDir, "orders");
                Files.createDirectories(uploadPath);
                Path filePath = uploadPath.resolve(filename);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                // Créer ou mettre à jour SharedDetails
                SharedDetailsDto sharedDetailsDto = dto.getSharedDetails();
                if (sharedDetailsDto == null) {
                    sharedDetailsDto = new SharedDetailsDto();
                }
                sharedDetailsDto.setAttachmentPath("orders/" + filename);

                // Si c'est un nouveau SharedDetails, le créer
                if (sharedDetailsDto.getSharedDetailsId() == null) {
                    sharedDetailsDto = sharedDetailsService.create(sharedDetailsDto);
                } else {
                    sharedDetailsDto = sharedDetailsService.update(
                            sharedDetailsDto.getSharedDetailsId(),
                            sharedDetailsDto
                    );
                }

                // Mettre à jour le DTO de l'ordre avec le SharedDetails mis à jour
                dto.setSharedDetails(sharedDetailsDto);

            } catch (IOException e) {
                throw new RuntimeException("Erreur lors du traitement du fichier", e);
            }
        }


        OrderDto savedOrderDto = super.create(dto);

        // Générer une livraison à partir de la commande créée
        DeliveryDto deliveryDto = new DeliveryDto();

        // Associer la commande à la livraison
        deliveryDto.setOrder(savedOrderDto);
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