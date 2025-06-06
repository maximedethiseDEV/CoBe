package com.beco.api.mapper;

import com.beco.api.model.dto.GetOrderDto;
import com.beco.api.model.dto.PostOrderDto;
import com.beco.api.model.entity.Customer;
import com.beco.api.model.entity.Order;
import com.beco.api.model.entity.Product;
import com.beco.api.model.entity.SharedDetails;
import org.mapstruct.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Mapper(componentModel = "spring", imports = {LocalDate.class, LocalTime.class})
public interface OrderMapper {

    @Mapping(target = "orderId", ignore = true)
    @Mapping(target = "billingCustomer", source = "billingCustomerId", qualifiedByName = "customerFromId")
    @Mapping(target = "deliveryCustomer", source = "deliveryCustomerId", qualifiedByName = "customerFromId")
    @Mapping(target = "product", source = "productId", qualifiedByName = "productFromId")
    @Mapping(target = "sharedDetails", source = "shareDetailsId", qualifiedByName = "sharedDetailsFromId")
    @Mapping(target = "requestedDeliveryDate", source = "requestedDeliveryDate", qualifiedByName = "stringToDate")
    @Mapping(target = "requestedDeliveryTime", source = "requestedDeliveryTime", qualifiedByName = "stringToTime")
    Order toEntity(PostOrderDto dto);

    @Mapping(target = "orderId", source = "orderId")
    @Mapping(target = "billingCustomerId", source = "billingCustomer.customerId")
    @Mapping(target = "deliveryCustomerId", source = "deliveryCustomer.customerId")
    @Mapping(target = "productId", source = "product.productId")
    @Mapping(target = "shareDetailsId", source = "sharedDetails.sharedDetailsId")
    @Mapping(target = "requestedDeliveryDate", source = "requestedDeliveryDate", qualifiedByName = "dateToString")
    @Mapping(target = "requestedDeliveryTime", source = "requestedDeliveryTime", qualifiedByName = "timeToString")
    GetOrderDto toDto(Order entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "orderId", ignore = true)
    @Mapping(target = "billingCustomer", source = "billingCustomerId", qualifiedByName = "customerFromId")
    @Mapping(target = "deliveryCustomer", source = "deliveryCustomerId", qualifiedByName = "customerFromId")
    @Mapping(target = "product", source = "productId", qualifiedByName = "productFromId")
    @Mapping(target = "sharedDetails", source = "shareDetailsId", qualifiedByName = "sharedDetailsFromId")
    @Mapping(target = "requestedDeliveryDate", source = "requestedDeliveryDate", qualifiedByName = "stringToDate")
    @Mapping(target = "requestedDeliveryTime", source = "requestedDeliveryTime", qualifiedByName = "stringToTime")
    void updateOrderFromDto(PostOrderDto dto, @MappingTarget Order order);

    @Named("customerFromId")
    default Customer customerFromId(Integer id) {
        if (id == null) return null;
        Customer customer = new Customer();
        customer.setCustomerId(id);
        return customer;
    }

    @Named("productFromId")
    default Product productFromId(Integer id) {
        if (id == null) return null;
        Product product = new Product();
        product.setProductId(id);
        return product;
    }

    @Named("sharedDetailsFromId")
    default SharedDetails sharedDetailsFromId(Integer id) {
        if (id == null) return null;
        SharedDetails sharedDetails = new SharedDetails();
        sharedDetails.setSharedDetailsId(id);
        return sharedDetails;
    }

    @Named("stringToDate")
    default LocalDate stringToDate(String date) {
        return (date == null || date.isBlank()) ? null : LocalDate.parse(date);
    }

    @Named("stringToTime")
    default LocalTime stringToTime(String time) {
        return (time == null || time.isBlank()) ? null : LocalTime.parse(time);
    }

    @Named("dateToString")
    default String dateToString(LocalDate date) {
        return (date == null) ? null : date.toString();
    }

    @Named("timeToString")
    default String timeToString(LocalTime time) {
        return (time == null) ? null : time.toString();
    }
}
