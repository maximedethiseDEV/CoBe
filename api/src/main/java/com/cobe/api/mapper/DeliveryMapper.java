package com.cobe.api.mapper;

import com.cobe.api.model.dto.DeliveryDto;
import com.cobe.api.model.dto.PostDeliveryDto;
import com.cobe.api.model.entity.Delivery;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {BaseMapper.class, OrderMapper.class, TransportSupplierMapper.class, DeliveryOrderNumberMapper.class, DeliveryStatusMapper.class, TransportSupplierMapper.class})
public interface DeliveryMapper {

    @Mapping(source = "order.id", target = "orderId")
    @Mapping(source = "transportSupplier.id", target = "transportSupplierId")
    @Mapping(source = "transportSupplier.company.companyName", target = "transportSupplierName")
    @Mapping(source = "deliveryOrderNumber.id", target = "deliveryOrderNumberId")
    @Mapping(source = "sharedDetails.id", target = "sharedDetailsId")
    @Mapping(source = "status.id", target = "statusId")
    DeliveryDto toDto(Delivery entity);

    @Mapping(source = "orderId", target = "order.id")
    @Mapping(source = "transportSupplierId", target = "transportSupplier", qualifiedByName = "mapTransportSupplierIdToTransportSupplier")
    @Mapping(source = "deliveryOrderNumberId", target = "deliveryOrderNumber", qualifiedByName = "mapDeliveryOrderNumberIdToDeliveryOrderNumber")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    @Mapping(source = "statusId", target = "status.id")
    Delivery toEntity(PostDeliveryDto dto);

    @Mapping(source = "orderId", target = "order.id")
    @Mapping(source = "transportSupplierId", target = "transportSupplier", qualifiedByName = "mapTransportSupplierIdToTransportSupplier")
    @Mapping(source = "deliveryOrderNumberId", target = "deliveryOrderNumber", qualifiedByName = "mapDeliveryOrderNumberIdToDeliveryOrderNumber")
    @Mapping(source = "sharedDetailsId", target = "sharedDetails", qualifiedByName = "mapSharedDetailsIdToSharedDetails")
    @Mapping(source = "statusId", target = "status.id")
    void updateDeliveryFromDto(PostDeliveryDto dto, @MappingTarget Delivery entity);
}