package com.cobe.api.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class PostCustomerDto extends AbstractDto {

    private UUID companyId;

    private UUID contactId;

    private UUID sharedDetailsId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateStart;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateEnd;

    private Boolean isSolvent = true;

    private UUID parentId;
}