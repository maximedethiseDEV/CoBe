package com.cobe.api.mapper;

import com.cobe.api.model.dto.SharedDetailsDto;
import com.cobe.api.model.entity.SharedDetails;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface SharedDetailsMapper {

    SharedDetailsDto toDto(SharedDetails sharedDetails);

    SharedDetails toEntity(SharedDetailsDto sharedDetailsDto);

    void updateSharedDetailsFromDto(SharedDetailsDto dto, @MappingTarget SharedDetails sharedDetails);
}