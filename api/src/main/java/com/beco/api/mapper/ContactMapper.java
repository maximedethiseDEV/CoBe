package com.beco.api.mapper;

import com.beco.api.model.dto.ContactDto;
import com.beco.api.model.entity.Contact;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ContactMapper {

    /** Convertit un ContactDto en une entité Contact **/
    @Mapping(target = "contactId", ignore = true) // Ignore l'ID pour la création
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "phone", source = "phone")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "role", source = "role")
    @Mapping(target = "createdDate", source = "createdDate")
    @Mapping(target = "lastModifiedDate", source = "lastModifiedDate")
    Contact toEntity(ContactDto dto);

    /** Convertit une entité Contact en DTO **/
    @Mapping(target = "contactId", source = "contactId")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "phone", source = "phone")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "role", source = "role")
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    ContactDto toDto(Contact entity);

    /** Met à jour une entité Contact existante depuis un ContactDto sans écraser les champs null **/
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "contactId", ignore = true) // Empêche la mise à jour de l'ID
    void updateContactFromDto(ContactDto dto, @MappingTarget Contact contact);
}