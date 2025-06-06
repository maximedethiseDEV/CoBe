package com.beco.api.service.object;

import com.beco.api.model.dto.PostOrderDto;
import com.beco.api.mapper.OrderMapper;
import com.beco.api.model.dto.GetOrderDto;
import com.beco.api.model.entity.Customer;
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
public class OrderDtoService extends AbstractCrudService<Order, GetOrderDto, PostOrderDto, Integer> {

    private final OrderRepository repository;
    private final OrderMapper mapper;

    public OrderDtoService(
            OrderRepository repository,
            CacheManager cacheManager,
            OrderMapper mapper
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateOrderFromDto
        );
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    @Cacheable(key = "'all'")
    public List<GetOrderDto> findAll() {
        return super.findAll();
    }

    @Override
    @Cacheable(key = "#id")
    public GetOrderDto findById(Integer id) {
        return super.findById(id);
    }

    @Override
    @CachePut(key = "#result.id")
    public GetOrderDto create(PostOrderDto dto) {
        return super.create(dto);
    }

    @Override
    @CachePut(key = "#id")
    public GetOrderDto update(Integer id, PostOrderDto dto) {
        return super.update(id, dto);
    }

    @Override
    @CacheEvict(key = "#id")
    public void deleteById(Integer id) {
        super.deleteById(id);
    }

    @Override
    protected boolean dataValidatorControl(PostOrderDto postOrderDto) { return true; }

    @Override
    protected String getEntityName() {
        return "order";
    }

    // Récupérer les commandes par client de facturation
    public List<GetOrderDto> getOrdersForBillingCustomer(Integer clientId) {
        Customer billingClient = new Customer();
        billingClient.setCustomerId(clientId);
        return findByBillingCustomer(billingClient);
    }

    public List<GetOrderDto> findByBillingCustomer(Customer billingClient) {
        return repository.findByBillingCustomer(billingClient)
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }
}
