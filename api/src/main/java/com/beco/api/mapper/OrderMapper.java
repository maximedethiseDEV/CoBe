package com.beco.api.mapper;

import com.beco.api.dto.OrderDto;
import com.beco.api.model.Customer;
import com.beco.api.model.Order;
import com.beco.api.model.Product;
import com.beco.api.model.SharedDetails;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring", imports = {LocalDate.class, LocalTime.class, DateTimeFormatter.class})
public interface OrderMapper {

    /** Convertit un OrderDto vers une entité Order (utilisé pour la création et la mise à jour) **/
    @Mapping(target = "orderId", ignore = true) // Ignore les IDs pour la création/mise à jour
    @Mapping(target = "billingCustomer", source = "billingCustomerId", qualifiedByName = "customerFromId")
    @Mapping(target = "deliveryCustomer", source = "deliveryCustomerId", qualifiedByName = "customerFromId")
    @Mapping(target = "product", source = "productId", qualifiedByName = "productFromId")
    @Mapping(target = "quantity", source = "quantity")
    @Mapping(target = "sharedDetails", source = "shareDetailsId", qualifiedByName = "sharedDetailsFromId")
    @Mapping(target = "requestedDeliveryDate", source = "requestedDeliveryDate", qualifiedByName = "stringToDate")
    @Mapping(target = "requestedDeliveryTime", source = "requestedDeliveryTime", qualifiedByName = "stringToTime")
    Order toEntity(OrderDto dto);

    /** Convertit une entité Order vers un OrderDto avec l'ID inclus **/
    @Mapping(target = "orderDtoId", source = "orderId")
    @Mapping(target = "billingCustomerId", source = "billingCustomer.customerId")
    @Mapping(target = "deliveryCustomerId", source = "deliveryCustomer.customerId")
    @Mapping(target = "productId", source = "product.productId")
    @Mapping(target = "quantity", source = "quantity")
    @Mapping(target = "shareDetailsId", source = "sharedDetails.sharedDetailsId")
    @Mapping(target = "requestedDeliveryDate", source = "requestedDeliveryDate", qualifiedByName = "dateToString")
    @Mapping(target = "requestedDeliveryTime", source = "requestedDeliveryTime", qualifiedByName = "timeToString")
    OrderDto toDto(Order entity);

    /** Met à jour l'entité Order depuis OrderDto sans écraser les champs null ou l'ID **/
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "orderId", ignore = true) // ID non modifiable
    void updateOrderFromDto(OrderDto dto, @MappingTarget Order order);

    /** Méthodes de conversion customisées **/
    @Named("customerFromId")
    default Customer customerFromId(Integer id) {
        if (id == null) {
            return null;
        }
        Customer customer = new Customer();
        customer.setCustomerId(id);
        return customer;
    }

    @Named("productFromId")
    default Product productFromId(Integer id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setProductId(id);
        return product;
    }

    @Named("sharedDetailsFromId")
    default SharedDetails sharedDetailsFromId(Integer id) {
        if (id == null) {
            return null;
        }
        SharedDetails sharedDetails = new SharedDetails();
        sharedDetails.setSharedDetailsId(id);
        return sharedDetails;
    }

    @Named("stringToDate")
    default LocalDate stringToDate(String date) {
        return (date == null || date.isEmpty()) ? null : LocalDate.parse(date);
    }

    @Named("stringToTime")
    default LocalTime stringToTime(String time) {
        return (time == null || time.isEmpty()) ? null : LocalTime.parse(time);
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