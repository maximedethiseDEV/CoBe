package com.beco.api.service.dto;

import com.beco.api.dto.OrderDto;
import com.beco.api.mapper.OrderMapper;
import com.beco.api.model.Customer;
import com.beco.api.model.Order;
import com.beco.api.repository.OrderRepository;
import com.beco.api.service.CrudService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDtoService implements CrudService<OrderDto, Integer> {

    private final OrderRepository repository;
    private final OrderMapper mapper;

    public OrderDtoService(OrderRepository repository, OrderMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<OrderDto> findAll() {
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public OrderDto findById(Integer id) {
        Order order = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Commande n°" + id + " introuvable"));
        return mapper.toDto(order);
    }

    @Override
    public OrderDto create(OrderDto orderDto) {
        Order order = mapper.toEntity(orderDto);
        Order savedOrder = repository.save(order);
        return mapper.toDto(savedOrder);
    }

    @Override
    public OrderDto update(Integer id, OrderDto orderDto) {
        // Vérifier si la commande avec cet ID existe
        Order existingOrder = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Commande n°" + id + " introuvable"));

        // Mettre à jour les champs depuis le DTO, tout en conservant l'ID
        mapper.updateOrderFromDto(orderDto, existingOrder);

        // Sauvegarder les modifications dans la base de données
        Order updatedOrder = repository.save(existingOrder);
        return mapper.toDto(updatedOrder);
    }

    @Override
    public void deleteById(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Commande n°" + id + " introuvable");
        }
        repository.deleteById(id);
    }

    // Récupérer les commandes par client de facturation
    public List<OrderDto> getOrdersForBillingCustomer(Integer clientId) {
        Customer billingClient = new Customer();
        billingClient.setCustomerId(clientId);
        return findByBillingCustomer(billingClient);
    }

    public List<OrderDto> findByBillingCustomer(Customer billingClient) {
        return repository.findByBillingCustomer(billingClient)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }
}
