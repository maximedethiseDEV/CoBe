package com.beco.api.mapper;

import com.beco.api.model.dto.CustomerDto;
import com.beco.api.model.entity.Customer;
import com.beco.api.model.entity.Company;
import com.beco.api.model.entity.Contact;
import com.beco.api.model.entity.Address;
import org.mapstruct.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring", uses = {ContactMapper.class})
public interface CustomerMapper {

    DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Mapping(target = "customerId", ignore = true)
    @Mapping(target = "company", source = "companyId", qualifiedByName = "companyFromId")
    @Mapping(target = "contact", source = "contactId", qualifiedByName = "contactFromId")
    @Mapping(target = "deliveryAddress", source = "deliveryAddressId", qualifiedByName = "addressFromId")
    @Mapping(target = "parent", source = "parentId", qualifiedByName = "customerFromId")
    @Mapping(target = "dateStart", source = "dateStart", qualifiedByName = "stringToDate")
    @Mapping(target = "dateEnd", source = "dateEnd", qualifiedByName = "stringToDate")
    Customer toEntity(CustomerDto dto);

    @Mapping(target = "customerId", source = "customerId")
    @Mapping(target = "compagnyName", source = "company.name")
    @Mapping(target = "companyId", source = "company.companyId")
    @Mapping(target = "contactId", source = "contact.contactId")
    @Mapping(target = "deliveryAddressId", source = "deliveryAddress.addressId")
    @Mapping(target = "parentId", source = "parent.customerId")
    @Mapping(target = "dateStart", source = "dateStart", qualifiedByName = "dateToString")
    @Mapping(target = "dateEnd", source = "dateEnd", qualifiedByName = "dateToString")
    CustomerDto toDto(Customer entity);

    // Met à jour une entité Customer existante depuis un CustomerDto sans écraser les champs null
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "customerId", ignore = true) // ID non modifiable
    void updateCustomerFromDto(CustomerDto dto, @MappingTarget Customer customer);

    @Named("stringToDate")
    default LocalDate stringToDate(String date) {
        return (date != null && !date.isEmpty()) ? LocalDate.parse(date, FORMATTER) : null;
    }

    @Named("dateToString")
    default String dateToString(LocalDate date) {
        return (date != null) ? date.format(FORMATTER) : null;
    }

    @Named("companyFromId")
    default Company companyFromId(Integer id) {
        if (id == null) return null;
        Company company = new Company();
        company.setCompanyId(id);
        return company;
    }

    @Named("contactFromId")
    default Contact contactFromId(Integer id) {
        if (id == null) return null;
        Contact contact = new Contact();
        contact.setContactId(id);
        return contact;
    }

    @Named("addressFromId")
    default Address addressFromId(Integer id) {
        if (id == null) return null;
        Address address = new Address();
        address.setAddressId(id);
        return address;
    }

    @Named("customerFromId")
    default Customer customerFromId(Integer id) {
        if (id == null) return null;
        Customer customer = new Customer();
        customer.setCustomerId(id);
        return customer;
    }
}
