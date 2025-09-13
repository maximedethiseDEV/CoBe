package com.cobe.api.service.object;

import com.cobe.api.mapper.DeliveryMapper;
import com.cobe.api.model.dto.DeliveryDto;
import com.cobe.api.model.dto.PostDeliveryDto;
import com.cobe.api.model.entity.Delivery;
import com.cobe.api.model.entity.DeliveryStatus;
import com.cobe.api.model.entity.TransportSupplier;
import com.cobe.api.repository.DeliveryRepository;
import com.cobe.api.service.AbstractCrudService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@CacheConfig(cacheNames = "deliveries")
public class DeliveryService extends AbstractCrudService<Delivery, DeliveryDto, PostDeliveryDto, java.util.UUID> {

    @Value("${app.mail.from}")
    private String emailSender;

    private final DeliveryRepository repository;
    private final DeliveryMapper mapper;

    public DeliveryService(
            DeliveryRepository repository,
            CacheManager cacheManager,
            DeliveryMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateDeliveryFromDto
        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    protected boolean dataValidatorControl(PostDeliveryDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "delivery";
    }

    @Transactional
    public void assignTransportSupplier(UUID id, UUID transportSupplierId) {
        Delivery selectedDelivery = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(getEntityName() + " n°" + id + " introuvable"));

        TransportSupplier selectedTransportSupplier = new TransportSupplier();
        selectedTransportSupplier.setId(transportSupplierId);
        selectedDelivery.setTransportSupplier(selectedTransportSupplier);

        repository.save(selectedDelivery);
    }


}
