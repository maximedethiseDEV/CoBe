package com.cobe.api.mapper;

import com.cobe.api.model.dto.DBUserDto;
import com.cobe.api.model.dto.PostDBUserDto;
import com.cobe.api.model.entity.DBUser;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {BaseMapper.class})
public interface DBUserMapper {

    @Mapping(source = "contact.id", target = "contactId")
    @Mapping(source = "contact.firstName", target = "firstName")
    @Mapping(source = "contact.lastName", target = "lastName")
    @Mapping(source = "contact.email", target = "email")
    @Mapping(source = "contact.phone", target = "phone")
    DBUserDto toDto(DBUser entity);

    @Mapping(source = "contactId", target = "contact", qualifiedByName = "mapContactIdToContact")
    DBUser toEntity(PostDBUserDto dto);

    @Mapping(source = "contactId", target = "contact", qualifiedByName = "mapContactIdToContact")
    void updateDBUserFromDto(PostDBUserDto dto, @MappingTarget DBUser entity);
}