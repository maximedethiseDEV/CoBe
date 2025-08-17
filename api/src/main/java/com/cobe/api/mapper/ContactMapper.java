package com.cobe.api.mapper;

import com.cobe.api.model.dto.ContactDto;
import com.cobe.api.model.entity.Contact;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ContactMapper {

    Contact toEntity(ContactDto dto);

    ContactDto toDto(Contact entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateContactFromDto(ContactDto dto, @MappingTarget Contact contact);
}