package com.beco.api.mapper;

import com.beco.api.model.dto.SharedDetailsDto;
import com.beco.api.model.entity.SharedDetails;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface SharedDetailsMapper {

    @Mapping(target = "sharedDetailsId", source = "sharedDetailsId")
    @Mapping(target = "attachmentPath", source = "attachmentPath")
    @Mapping(target = "notes", source = "notes")
    SharedDetailsDto toDto(SharedDetails sharedDetails);

    @Mapping(target = "sharedDetailsId", ignore = true)
    @Mapping(target = "attachmentPath", source = "attachmentPath")
    @Mapping(target = "notes", source = "notes")
    SharedDetails toEntity(SharedDetailsDto sharedDetailsDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "sharedDetailsId", ignore = true)
    void updateSharedDetailsFromDto(SharedDetailsDto dto, @MappingTarget SharedDetails sharedDetails);
}