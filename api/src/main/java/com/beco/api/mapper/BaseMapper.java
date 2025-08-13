package com.beco.api.mapper;

import com.beco.api.model.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.UUID;

@Mapper(componentModel = "spring")
interface BaseMapper {
    @Named("mapContactIdToContact")
    default Contact mapContactIdToContact(UUID id) {
        if (id == null) return null;
        Contact contact = new Contact();
        contact.setId(id);
        return contact;
    }

    @Named("mapAddressIdToAddress")
    default Address mapAddressIdToAddress(UUID id) {
        if (id == null) return null;
        Address address = new Address();
        address.setId(id);
        return address;
    }

    @Named("mapSharedDetailsIdToSharedDetails")
    default SharedDetails mapSharedDetailsIdToSharedDetails(UUID id) {
        if (id == null) return null;
        SharedDetails sharedDetails = new SharedDetails();
        sharedDetails.setId(id);
        return sharedDetails;
    }

    @Named("mapCompanyIdToCompany")
    default Company mapCompanyIdToCompany(UUID id) {
        if (id == null) return null;
        Company company = new Company();
        company.setId(id);
        return company;
    }

    @Named("mapCustomerIdToCustomer")
    default Customer mapCustomerIdToCustomer(UUID id) {
        if (id == null) return null;
        Customer customer = new Customer();
        customer.setId(id);
        return customer;
    }

    @Named("mapConstructionSiteIdToConstructionSite")
    default ConstructionSite mapConstructionSiteIdToConstructionSite(UUID id) {
        if (id == null) return null;
        ConstructionSite constructionSite = new ConstructionSite();
        constructionSite.setId(id);
        return constructionSite;
    }

    @Named("mapDeliveryOrderNumberIdToDeliveryOrderNumber")
    default DeliveryOrderNumber mapDeliveryOrderNumberIdToDeliveryOrderNumber(UUID id) {
        if (id == null) return null;
        DeliveryOrderNumber deliveryOrderNumber = new DeliveryOrderNumber();
        deliveryOrderNumber.setId(id);
        return deliveryOrderNumber;
    }
}
