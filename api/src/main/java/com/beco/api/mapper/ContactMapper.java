package com.beco.api.mapper;

import com.beco.api.model.dto.ContactDto;
import com.beco.api.model.entity.Contact;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ContactMapper {

    Contact toEntity(ContactDto dto);

    ContactDto toDto(Contact entity);

    /** Met à jour une entité Contact existante depuis un ContactDto sans écraser les champs null **/
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "contactId", ignore = true) // Empêche la mise à jour de l'ID
    void updateContactFromDto(ContactDto dto, @MappingTarget Contact contact);
}