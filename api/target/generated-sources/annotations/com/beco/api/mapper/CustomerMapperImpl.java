package com.beco.api.mapper;

import com.beco.api.model.dto.CustomerDto;
import com.beco.api.model.entity.Address;
import com.beco.api.model.entity.Company;
import com.beco.api.model.entity.Contact;
import com.beco.api.model.entity.Customer;
import java.time.LocalDate;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-05T22:42:20+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class CustomerMapperImpl implements CustomerMapper {

    @Override
    public Customer toEntity(CustomerDto dto) {
        if ( dto == null ) {
            return null;
        }

        Customer customer = new Customer();

        customer.setCompany( companyFromId( dto.getCompanyId() ) );
        customer.setContact( contactFromId( dto.getContactId() ) );
        customer.setDeliveryAddress( addressFromId( dto.getDeliveryAddressId() ) );
        customer.setParent( customerFromId( dto.getParentId() ) );
        customer.setDateStart( stringToDate( dto.getDateStart() ) );
        customer.setDateEnd( stringToDate( dto.getDateEnd() ) );
        customer.setAttachmentPath( dto.getAttachmentPath() );
        customer.setNotes( dto.getNotes() );
        customer.setIsSolvent( dto.getIsSolvent() );

        return customer;
    }

    @Override
    public CustomerDto toDto(Customer entity) {
        if ( entity == null ) {
            return null;
        }

        CustomerDto customerDto = new CustomerDto();

        customerDto.setCustomerId( entity.getCustomerId() );
        customerDto.setCompagnyName( entityCompanyName( entity ) );
        customerDto.setCompanyId( entityCompanyCompanyId( entity ) );
        customerDto.setContactId( entityContactContactId( entity ) );
        customerDto.setDeliveryAddressId( entityDeliveryAddressAddressId( entity ) );
        customerDto.setParentId( entityParentCustomerId( entity ) );
        customerDto.setDateStart( dateToString( entity.getDateStart() ) );
        customerDto.setDateEnd( dateToString( entity.getDateEnd() ) );
        customerDto.setAttachmentPath( entity.getAttachmentPath() );
        customerDto.setNotes( entity.getNotes() );
        customerDto.setIsSolvent( entity.getIsSolvent() );

        return customerDto;
    }

    @Override
    public void updateCustomerFromDto(CustomerDto dto, Customer customer) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getAttachmentPath() != null ) {
            customer.setAttachmentPath( dto.getAttachmentPath() );
        }
        if ( dto.getNotes() != null ) {
            customer.setNotes( dto.getNotes() );
        }
        if ( dto.getDateStart() != null ) {
            customer.setDateStart( LocalDate.parse( dto.getDateStart() ) );
        }
        if ( dto.getDateEnd() != null ) {
            customer.setDateEnd( LocalDate.parse( dto.getDateEnd() ) );
        }
        if ( dto.getIsSolvent() != null ) {
            customer.setIsSolvent( dto.getIsSolvent() );
        }
    }

    private String entityCompanyName(Customer customer) {
        Company company = customer.getCompany();
        if ( company == null ) {
            return null;
        }
        return company.getName();
    }

    private Integer entityCompanyCompanyId(Customer customer) {
        Company company = customer.getCompany();
        if ( company == null ) {
            return null;
        }
        return company.getCompanyId();
    }

    private Integer entityContactContactId(Customer customer) {
        Contact contact = customer.getContact();
        if ( contact == null ) {
            return null;
        }
        return contact.getContactId();
    }

    private Integer entityDeliveryAddressAddressId(Customer customer) {
        Address deliveryAddress = customer.getDeliveryAddress();
        if ( deliveryAddress == null ) {
            return null;
        }
        return deliveryAddress.getAddressId();
    }

    private Integer entityParentCustomerId(Customer customer) {
        Customer parent = customer.getParent();
        if ( parent == null ) {
            return null;
        }
        return parent.getCustomerId();
    }
}
