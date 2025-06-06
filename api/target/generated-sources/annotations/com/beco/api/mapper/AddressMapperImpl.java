package com.beco.api.mapper;

import com.beco.api.model.dto.GetAddressDto;
import com.beco.api.model.dto.PostAddressDto;
import com.beco.api.model.entity.Address;
import com.beco.api.model.entity.City;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-05T22:42:20+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class AddressMapperImpl implements AddressMapper {

    @Override
    public Address toEntity(PostAddressDto dto) {
        if ( dto == null ) {
            return null;
        }

        Address address = new Address();

        address.setCity( cityFromId( dto.getCityId() ) );
        address.setStreet( dto.getStreet() );

        return address;
    }

    @Override
    public GetAddressDto toDto(Address entity) {
        if ( entity == null ) {
            return null;
        }

        GetAddressDto getAddressDto = new GetAddressDto();

        getAddressDto.setAddressId( entity.getAddressId() );
        getAddressDto.setCityName( entityCityCityName( entity ) );
        getAddressDto.setStreet( entity.getStreet() );

        return getAddressDto;
    }

    @Override
    public void updateAddressFromDto(PostAddressDto dto, Address address) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getStreet() != null ) {
            address.setStreet( dto.getStreet() );
        }
    }

    private String entityCityCityName(Address address) {
        City city = address.getCity();
        if ( city == null ) {
            return null;
        }
        return city.getCityName();
    }
}
