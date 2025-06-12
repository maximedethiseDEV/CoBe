package com.beco.api.service.object;

import com.beco.api.mapper.OrderMapper;
import com.beco.api.model.dto.OrderDto;
import com.beco.api.model.entity.Order;
import com.beco.api.repository.OrderRepository;
import com.beco.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@CacheConfig(cacheNames = "orders")
public class OrderService extends AbstractCrudService<Order, OrderDto, OrderDto, Integer> {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    public OrderService(
            OrderRepository orderRepository,
            CacheManager cacheManager,
            OrderMapper orderMapper
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
    }

    @Override
    @Cacheable(key = "'all'")
    public List<OrderDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public OrderDto findById(Integer id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.id")
    public OrderDto create(OrderDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    public OrderDto update(Integer id, OrderDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(Integer id) {
        super.deleteById(id);
    }

    @Override
    protected boolean dataValidatorControl(OrderDto countryDto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "country";
    }

    public List<OrderDto> findOrdersByCustomer(Integer customerId) {
        List<Order> orders = orderRepository.findByBillingCustomerCustomerId(customerId);
        return orders.stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

}
