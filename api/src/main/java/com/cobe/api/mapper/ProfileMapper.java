package com.cobe.api.mapper;

import com.cobe.api.model.dto.PostProfileDto;
import com.cobe.api.model.dto.ProfileDto;
import com.cobe.api.model.entity.DBUser;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ProfileMapper {

    @Mapping(source = "contact.firstName", target = "firstName")
    @Mapping(source = "contact.lastName", target = "lastName")
    @Mapping(source = "contact.email", target = "email")
    @Mapping(source = "contact.phone", target = "phone")
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "permission", ignore = true)
    ProfileDto toDto(DBUser user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "username", ignore = true)
    void updateFromDto(PostProfileDto dto, @MappingTarget DBUser user);
}