package com.cobe.api.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class ConstructionSiteDto extends AbstractDto {

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateStart;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateEnd;

    private UUID customerId;
    private String companyName;

    private UUID addressId;
        private String street;
        private String cityName;
        private String postalCode;
        private String countryCode;

    private UUID contactId;

    private UUID sharedDetailsId;
}