package com.beco.api.mapper;

import com.beco.api.model.dto.ContactDto;
import com.beco.api.model.entity.Contact;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-05T22:42:20+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class ContactMapperImpl implements ContactMapper {

    @Override
    public Contact toEntity(ContactDto dto) {
        if ( dto == null ) {
            return null;
        }

        Contact contact = new Contact();

        contact.setLastName( dto.getLastName() );
        contact.setFirstName( dto.getFirstName() );
        contact.setPhone( dto.getPhone() );
        contact.setEmail( dto.getEmail() );
        contact.setRole( dto.getRole() );

        return contact;
    }

    @Override
    public ContactDto toDto(Contact entity) {
        if ( entity == null ) {
            return null;
        }

        ContactDto contactDto = new ContactDto();

        contactDto.setContactId( entity.getContactId() );
        contactDto.setLastName( entity.getLastName() );
        contactDto.setFirstName( entity.getFirstName() );
        contactDto.setPhone( entity.getPhone() );
        contactDto.setEmail( entity.getEmail() );
        contactDto.setRole( entity.getRole() );

        return contactDto;
    }

    @Override
    public void updateContactFromDto(ContactDto dto, Contact contact) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getLastName() != null ) {
            contact.setLastName( dto.getLastName() );
        }
        if ( dto.getFirstName() != null ) {
            contact.setFirstName( dto.getFirstName() );
        }
        if ( dto.getPhone() != null ) {
            contact.setPhone( dto.getPhone() );
        }
        if ( dto.getEmail() != null ) {
            contact.setEmail( dto.getEmail() );
        }
        if ( dto.getRole() != null ) {
            contact.setRole( dto.getRole() );
        }
    }
}
